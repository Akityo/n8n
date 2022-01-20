import { INodeTypeDescription } from 'n8n-workflow';

/**
 * Options to be displayed
 */
export const nodeDescription: INodeTypeDescription = {
	displayName: 'MongoDB',
	name: 'mongoDb',
	icon: 'file:mongodb.svg',
	group: ['input'],
	version: 1,
	description: 'Find, insert and update documents in MongoDB',
	defaults: {
		name: 'MongoDB',
	},
	inputs: ['main'],
	outputs: ['main'],
	credentials: [
		{
			name: 'mongoDb',
			required: true,
		},
	],
	properties: [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			options: [
				{
					name: 'Delete',
					value: 'delete',
					description: 'Delete documents.',
				},
				{
					name: 'Find',
					value: 'find',
					description: 'Find documents.',
				},
				{
					name: 'Insert',
					value: 'insert',
					description: 'Insert documents.',
				},
				{
					name: 'Update',
					value: 'update',
					description: 'Update documents.',
				},
				{
					name: 'Bulk Update',
					value: 'bulkUpdate',
					description: 'Bulk update documents.',
				},
			],
			default: 'find',
			description: 'The operation to perform.',
		},

		{
			displayName: 'Collection',
			name: 'collection',
			type: 'string',
			required: true,
			default: '',
			description: 'MongoDB Collection',
		},

		// ----------------------------------
		//         delete
		// ----------------------------------
		{
			displayName: 'Delete Query (JSON format)',
			name: 'query',
			type: 'json',
			typeOptions: {
				rows: 5,
			},
			displayOptions: {
				show: {
					operation: ['delete'],
				},
			},
			default: '{}',
			placeholder: `{ "birth": { "$gt": "1950-01-01" } }`,
			required: true,
			description: 'MongoDB Delete query.',
		},

		// ----------------------------------
		//         find
		// ----------------------------------
		{
			displayName: 'Options',
			name: 'options',
			type: 'collection',
			displayOptions: {
				show: {
					operation: ['find'],
				},
			},
			default: {},
			placeholder: 'Add options',
			description: 'Add query options',
			options: [
				{
					displayName: 'Limit',
					name: 'limit',
					type: 'number',
					default: 0,
					description:
						'Use limit to specify the maximum number of documents or 0 for unlimited documents.',
				},
				{
					displayName: 'Skip',
					name: 'skip',
					type: 'number',
					default: 0,
					description: 'The number of documents to skip in the results set.',
				},
				{
					displayName: 'Sort (JSON format)',
					name: 'sort',
					type: 'json',
					typeOptions: {
						rows: 2,
					},
					default: '{}',
					placeholder: '{ "field": -1 }',
					required: true,
					description: 'A JSON that defines the sort order of the result set.',
				},
				{
					displayName: 'Projection',
					name: 'projection',
					type: 'json',
					default: '{}',
					placeholder: '{ "field": 1 }',
					description: 'A JSON that defines or restricts fields to return.',
				},
				{
					displayName: 'ObjectId Fields',
					name: 'objectIdFields',
					type: 'string',
					default: '',
					description: 'Comma-separated list of fields that will be parse as Mongo ObjectId type.',
				},
			],
		},
		{
			displayName: 'Query (JSON format)',
			name: 'query',
			type: 'json',
			typeOptions: {
				rows: 5,
			},
			displayOptions: {
				show: {
					operation: ['find'],
				},
			},
			default: '{}',
			placeholder: `{ "birth": { "$gt": "1950-01-01" } }`,
			required: true,
			description: 'MongoDB Find query.',
		},
		// ----------------------------------
		//         insert
		// ----------------------------------
		{
			displayName: 'Fields',
			name: 'fields',
			type: 'string',
			displayOptions: {
				show: {
					operation: ['insert'],
				},
			},
			default: '',
			placeholder: 'name,description',
			description: 'Comma separated list of the fields to be included into the new document.',
		},

		// ----------------------------------
		//         update
		// ----------------------------------
		{
			displayName: 'Update Key',
			name: 'updateKey',
			type: 'string',
			displayOptions: {
				show: {
					operation: ['update', 'bulkUpdate'],
				},
			},
			default: 'id',
			required: true,
			description:
				'Name of the property which decides which rows in the database should be updated. Normally that would be "id".',
		},
		{
			displayName: 'Fields',
			name: 'fields',
			type: 'string',
			displayOptions: {
				show: {
					operation: ['update', 'bulkUpdate'],
				},
			},
			default: '',
			placeholder: 'name,description',
			description: 'Comma separated list of the fields to be included into the new document.',
		},
		{
			displayName: 'Upsert',
			name: 'upsert',
			type: 'boolean',
			displayOptions: {
				show: {
					operation: ['update', 'bulkUpdate'],
				},
			},
			default: false,
			description: `Perform an insert if no documents match the update key`,
		},
		{
			displayName: 'Options',
			name: 'options',
			type: 'collection',
			displayOptions: {
				show: {
					operation: ['update', 'insert', 'bulkUpdate'],
				},
			},
			placeholder: 'Add Option',
			default: {},
			options: [
				{
					displayName: 'Date Fields',
					name: 'dateFields',
					type: 'string',
					default: '',
					description: 'Comma separeted list of fields that will be parse as Mongo Date type.',
				},
				{
					displayName: 'ObjectId Fields',
					name: 'objectIdFields',
					type: 'string',
					default: '',
					description: 'Comma separeted list of fields that will be parse as Mongo ObjectId type.',
				},
			],
		},
	],
};