import type { FastifyReply } from 'fastify';
import { z } from 'zod';
import type { RequestWithUser } from '@/structures/interfaces.js';
import { http4xxErrorSchema } from '@/structures/schemas/HTTP4xxError.js';
import { http5xxErrorSchema } from '@/structures/schemas/HTTP5xxError.js';
import { log } from '@/utils/Logger.js';

export const schema = {
	summary: 'Rename file',
	description: 'Renames a file',
	tags: ['Files'],
	headers: z.object({
		albumuuid: z.string().optional().describe('The uuid of the album.'),
		'chibi-chunk-number': z.coerce.number().optional().describe('The chunk number.'),
		'chibi-chunks-total': z.coerce.number().optional().describe('The total number of chunks.'),
		'chibi-uuid': z.string().optional().describe('The uuid of the file.')
	}),
	body: z
		.object({
			name: z.string().describe('The name of the file.')
		})
		.or(z.null()),
	response: {
		200: z.object({
			name: z.string().describe('The name of the file.'),
			uuid: z.string().describe('The uuid of the file.'),
			url: z.string().describe('The URL of the file.'),
			identifier: z.string().optional().describe('The identifier of the file.'),
			publicUrl: z.string().optional().describe('The public URL of the file.')
		}),
		204: z.null(),
		'4xx': http4xxErrorSchema,
		'5xx': http5xxErrorSchema
	}
};

export const options = {
	url: '/file/:uuid/rename',
	method: 'post',
	middlewares: ['apiKey', 'auth']
};

export const run = async (_req: RequestWithUser, _res: FastifyReply) => {
	log.info('Hello, world!');
};
