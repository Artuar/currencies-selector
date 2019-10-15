import { createStandardAction } from "typesafe-actions";

export const choose = createStandardAction("@currencies/CHOOSE")<string>();

export const remove = createStandardAction("@currencies/REMOVE")<string>();
