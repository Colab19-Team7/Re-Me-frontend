import { saveSubscription, subscribePush } from "./utils";

export const regSW = async () => {
  // load service worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");

    const registration = await navigator.serviceWorker.ready;

    const sub = await subscribePush(registration);

    // console.log(sub);

    return await saveSubscription(sub);
  }
};
