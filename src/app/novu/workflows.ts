import { Client, workflow } from '@novu/framework';
import { renderEmail } from './emails/test-email';
import { z } from 'zod';

export const client = new Client({
  secretKey: process.env.NOVU_SECRET_KEY,
  /**
   * Disable this flag only during local development
   */
  strictAuthentication: process.env.NODE_ENV !== "development",
});

export const testWorkflow = workflow('test-workflow', async ({ step, payload }) => {
    await step.email('send-email', async (controls) => {
        return {
            subject: controls.subject,
            body: await renderEmail(payload.userName),
        };
    },
    {
        controlSchema: z.object({
            subject: z.string().default('A Successful Test on Novu from {{userName}}'),
        }),
    });
}, {
    payloadSchema: z.object({
        userName: z.string().default('John Doe'),
    }),
});