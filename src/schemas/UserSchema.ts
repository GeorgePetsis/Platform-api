import { z } from 'zod';

const UserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['ADMIN', 'VIEWER', 'EDITOR']),
  enabled: z.boolean(),
});
export default UserSchema;
