<?php
/**
 * contact.php — Integral Eléctrica
 * Recibe JSON via POST, valida, sanea y envía email via SMTP con PHPMailer.
 * Toda la configuración sensible se lee de variables de entorno.
 */

declare(strict_types=1);

// ─── CORS ───────────────────────────────────────────────────────────────────
$frontendUrl = getenv('FRONTEND_URL') ?: 'http://localhost:8081';

header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: {$frontendUrl}");
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ─── Sólo POST ──────────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

// ─── Leer JSON ──────────────────────────────────────────────────────────────
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Cuerpo de solicitud inválido.']);
    exit;
}

// ─── Sanitizar ──────────────────────────────────────────────────────────────
function clean(mixed $value): string {
    return htmlspecialchars(strip_tags(trim((string)($value ?? ''))), ENT_QUOTES, 'UTF-8');
}

$name    = clean($data['name']    ?? '');
$email   = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone   = clean($data['phone']   ?? '');
$service = clean($data['service'] ?? '');
$message = clean($data['message'] ?? '');

// ─── Validar ────────────────────────────────────────────────────────────────
$errors = [];

if (mb_strlen($name) < 2) {
    $errors[] = 'El nombre es demasiado corto.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'El email no es válido.';
}
if (!empty($phone) && !preg_match('/^[+\d\s\-()]{7,15}$/', $phone)) {
    $errors[] = 'El teléfono no es válido.';
}
if (mb_strlen($message) < 10) {
    $errors[] = 'El mensaje es demasiado corto.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// ─── Configuración SMTP desde variables de entorno ──────────────────────────
$mailHost     = getenv('MAIL_HOST')         ?: 'smtp.gmail.com';
$mailPort     = (int)(getenv('MAIL_PORT')   ?: 587);
$mailUsername = getenv('MAIL_USERNAME')     ?: '';
$mailPassword = getenv('MAIL_PASSWORD')     ?: '';
$mailFrom     = getenv('MAIL_FROM_ADDRESS') ?: $mailUsername;
$mailFromName = getenv('MAIL_FROM_NAME')    ?: 'Integral Eléctrica Web';
$mailTo       = getenv('MAIL_TO_ADDRESS')   ?: $mailUsername;

// ─── PHPMailer ──────────────────────────────────────────────────────────────
require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception as MailException;

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = $mailHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $mailUsername;
    $mail->Password   = $mailPassword;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $mailPort;
    $mail->CharSet    = 'UTF-8';

    // Sender & recipient
    $mail->setFrom($mailFrom, $mailFromName);
    $mail->addAddress($mailTo, 'Integral Eléctrica');
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(true);
    $serviceName = $service ?: 'No especificado';
    $phoneLine   = $phone   ? "<strong>Teléfono:</strong> {$phone}<br>" : '';

    $mail->Subject = "📩 Nuevo contacto web — {$name}";
    $mail->Body    = <<<HTML
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"></head>
    <body style="font-family:Inter,Arial,sans-serif;background:#0d1117;margin:0;padding:0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1117;padding:40px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#161b22;border-radius:16px;border:1px solid #30363d;overflow:hidden;max-width:600px;">
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#00c853,#1de9b6);padding:32px;text-align:center;">
                <div style="font-size:32px;margin-bottom:8px;">⚡</div>
                <h1 style="color:#0d1117;font-size:22px;margin:0;font-weight:800;">Nuevo mensaje de contacto</h1>
                <p style="color:rgba(13,17,23,0.7);margin:6px 0 0;font-size:14px;">Integral Eléctrica — Web Corporativa</p>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:32px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background:#1c2230;border-radius:12px;padding:24px;border:1px solid #30363d;">
                      <p style="color:#8b949e;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px;">Datos del remitente</p>
                      <p style="color:#f0f6fc;margin:0 0 10px;font-size:15px;"><strong style="color:#00c853;">Nombre:</strong> {$name}</p>
                      <p style="color:#f0f6fc;margin:0 0 10px;font-size:15px;"><strong style="color:#00c853;">Email:</strong> <a href="mailto:{$email}" style="color:#1de9b6;text-decoration:none;">{$email}</a></p>
                      {$phoneLine}
                      <p style="color:#f0f6fc;margin:0;font-size:15px;"><strong style="color:#00c853;">Servicio:</strong> {$serviceName}</p>
                    </td>
                  </tr>
                  <tr><td style="height:20px;"></td></tr>
                  <tr>
                    <td style="background:#1c2230;border-radius:12px;padding:24px;border:1px solid #30363d;">
                      <p style="color:#8b949e;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;">Mensaje</p>
                      <p style="color:#f0f6fc;font-size:15px;line-height:1.7;margin:0;">{$message}</p>
                    </td>
                  </tr>
                  <tr><td style="height:24px;"></td></tr>
                  <tr>
                    <td align="center">
                      <a href="mailto:{$email}"
                        style="display:inline-block;background:linear-gradient(135deg,#00c853,#1de9b6);color:#0d1117;font-weight:700;font-size:14px;padding:14px 32px;border-radius:10px;text-decoration:none;">
                        Responder a {$name}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="border-top:1px solid #30363d;padding:20px 32px;text-align:center;">
                <p style="color:#484f58;font-size:12px;margin:0;">Integral Eléctrica · Marbella, Costa del Sol</p>
                <p style="color:#484f58;font-size:11px;margin:6px 0 0;">Este mensaje fue enviado desde el formulario de contacto web.</p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
    HTML;

    $mail->AltBody = "Nuevo contacto web\n\nNombre: {$name}\nEmail: {$email}\nTeléfono: {$phone}\nServicio: {$serviceName}\n\nMensaje:\n{$message}";

    $mail->send();

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => '¡Gracias! Hemos recibido tu mensaje. Te contactamos pronto.',
    ]);

} catch (MailException $e) {
    // No revelar detalles del SMTP al cliente
    error_log('[Integral Eléctrica] Error SMTP: ' . $mail->ErrorInfo);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'No se pudo enviar el mensaje. Por favor, llámanos directamente.',
    ]);
}
