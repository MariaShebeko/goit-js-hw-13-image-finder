import { notice, error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

export function myNotice() {
  notice({
    text: "Enter the name of the image",
  });
}

export function myError() {
  error({
    text: "There's no image with this name",
  });
}
