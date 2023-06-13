import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function base64ToUint8Array(base64String: string | any[]) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export async function subscribePush(registration: ServiceWorkerRegistration) {
  const subscription = await registration.pushManager.getSubscription();

  if (subscription) return subscription;

  return await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: base64ToUint8Array(
      process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY as string
    ),
  });
}

export async function publishSubscription(
  subscription: PushSubscription,
  remove = false
) {
  const res = await fetch(`/api/${remove ? "un" : ""}subscribe`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      subscription: subscription,
    }),
  });

  return res.json();
}

export function saveSubscription(subscription: PushSubscription) {
  return publishSubscription(subscription);
}

export function deleteSubscription(subscription: PushSubscription) {
  return publishSubscription(subscription, true);
}
