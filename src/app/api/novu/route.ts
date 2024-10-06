import { serve } from "@novu/framework/next";
import { testWorkflow } from "../../novu/workflows";

export const { GET, POST, OPTIONS } = serve({ workflows: [testWorkflow] });
