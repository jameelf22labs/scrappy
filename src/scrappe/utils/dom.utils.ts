import { ElementHandle } from "puppeteer";

export const getTextContent = async (
  el: ElementHandle<Element> | null
): Promise<string> => {
  if (!el) return "";
  return (await el.evaluate((node) => node.textContent?.trim() || "")) || "";
};

export const getAttribute = async (
  el: ElementHandle<Element> | null,
  attr: string
): Promise<string> => {
  if (!el) return "";
  return (
    (await el.evaluate(
      (node, attribute) => node.getAttribute(attribute) || "",
      attr
    )) || ""
  );
};
