import { ObjectType } from "src/interface";

const cachedEnvironmentVariables: ObjectType = {
	...process?.env
};

/** Initialize environment variable, no dotenv library */
export function initEnvironmentVariables<TSchema extends ObjectType>(schema: {
	[key in keyof Partial<TSchema>]: {
		required: boolean;
		defaultValue?: number | string | boolean | ObjectType;
	};
}, options?: { debug?: boolean; }) {
	Object.entries(schema).forEach(([key, config]) => {
		const envValue = process?.env[key];
		if (!envValue && config?.required && !config?.defaultValue) {
			throw new Error(`Environment variable "${key}" cannot be null/undefined!`);
		}
		cachedEnvironmentVariables[key] = envValue || config?.defaultValue;
	});
	return cachedEnvironmentVariables as TSchema & ObjectType;
}