const BEARER_TOKEN_STORAGE_KEY = "token";

gapi.load("client:auth2", async () => {
  await gapi.client.init({
    clientId:
      "951763265125-6f417ln1kmlc6kmrtgh5sbt463cm8eh3.apps.googleusercontent.com",
    scope: "openid email profile",
  });
});

export function isSignedIn(): boolean {
  return !!sessionStorage.getItem(BEARER_TOKEN_STORAGE_KEY);
}

export async function signIn() {
  if (!isSignedIn()) {
    const code = await gapi.auth2.getAuthInstance().grantOfflineAccess();

    const resp = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
    });
    const token = await resp.json();
    sessionStorage.setItem(BEARER_TOKEN_STORAGE_KEY, token.access_token);
  }
}

export function signOut() {
  gapi.auth2.getAuthInstance().signOut();
  sessionStorage.removeItem(BEARER_TOKEN_STORAGE_KEY);
}

export async function getToken() {
  await signIn();
  return sessionStorage.getItem(BEARER_TOKEN_STORAGE_KEY);
}
