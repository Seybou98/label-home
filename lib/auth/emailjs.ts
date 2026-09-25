export async function sendLoginCode({ to, name, code }: { to: string; name: string; code: string }) {
  const service_id = process.env.EMAILJS_SERVICE_ID_connexion;
  const template_id = process.env.EMAILJS_TEMPLATE_ID_connexion;
  const user_id = process.env.EMAILJS_USER_ID_connexion;
  const accessToken = process.env.EMAILJS_PRIVATE_KEY_connexion;

  if (!service_id || !template_id || !user_id || !accessToken) {
    throw new Error("Configuration EmailJS (connexion) incomplète.");
  }

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id,
      template_id,
      user_id,
      accessToken,
      template_params: { name, code, to_email: to, email: to, user_email: to },
    }),
  });

  if (!res.ok) {
    throw new Error(`EmailJS ${res.status} : ${await res.text()}`);
  }
}
