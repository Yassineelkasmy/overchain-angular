import { Step } from "../models/Step";

export const steps:Step[] = [
  new Step(
    "Register",
    "submission/register",
    1,
  ),
  new Step(
    "Verify it`s you",

    "submission/register",
    2,
  ),
  new Step(
    "Register",
    "submission/accountverify",
    3,
  ),
];

