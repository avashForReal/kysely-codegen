import fs from 'node:fs';
import type { Config } from './src/cli/config';
import { toKyselyCamelCase } from './src/generator';
import type { DatabaseMetadata } from './src/introspector';

const typeMapping: Record<string, string> = {
  'int2': 'z.number().int()',
  'int4': 'z.number().int()',
  'int8': 'z.number().int()',
  'float4': 'z.number()',
  'float8': 'z.number()',
  'numeric': 'z.number()',
  'character varying': 'z.string()',
  'varchar': 'z.string()',
  'text': 'z.string()',
  'char': 'z.string()',
  'boolean': 'z.boolean()',
  'bool': 'z.boolean()',
  'date': 'z.date()',
  'timestamp': 'z.date()',
  'timestamptz': 'z.date()',
  'time': 'z.date()',
  'timetz': 'z.date()',
  'interval': 'z.unknown()',
  'bytea': 'z.instanceof(Buffer)',
  'json': 'z.unknown()',
  'jsonb': 'z.unknown()',
  'uuid': 'z.string().uuid()',
  'cidr': 'z.string()',
  'inet': 'z.string()',
  'macaddr': 'z.string()',
  'array': 'z.array(z.unknown())',
  'enum': 'z.enum([/*enumValues*/])',
  'point': 'z.tuple([z.number(), z.number()])',
  'polygon': 'z.array(z.tuple([z.number(), z.number()]))',
  'circle': 'z.tuple([z.number(), z.number(), z.number()])',
};

function generateSchemaTemplate(metadata: DatabaseMetadata): string {
  let output = 'import { z } from "zod";\n\n';

  for (const [enumName, enumValues] of Object.entries(metadata.enums.enums)) {
    const enumSchemaName = toKyselyCamelCase(enumName?.split('.')?.pop() ?? '');
    output += `export const ${enumSchemaName}EnumSchema = z.enum(${JSON.stringify(enumValues)});\n\n`;
  }

  for (const table of metadata.tables) {
    const schemaName = toKyselyCamelCase(table.name);
    output += `export const ${schemaName}Schema = z.object({\n`;

    for (const column of table.columns) {
      const columnName = toKyselyCamelCase(column.name);
      if (column.enumValues) {
        const enumSchemaName = toKyselyCamelCase(column.dataType);
        output += `  ${columnName}: ${enumSchemaName}EnumSchema,\n`;
      } else {
        output += `  ${columnName}: ${typeMapping[column.dataType] || 'z.unknown()'},\n`;
      }
    }

    output += '});\n\n';
  }

  return output;
}

function findAllColumnTypes(metadata: DatabaseMetadata): string[] {
  const allcolumntypes: string[] = [];

  for (const table of metadata.tables) {
    for (const column of table.columns) {
      if (!column.enumValues && !column.isArray) {
        allcolumntypes.push(column.dataType);
      }
    }
  }

  return [...new Set(allcolumntypes)];
}

function generateFiles(metadata: DatabaseMetadata, schemaTemplate: string, allColumnTypes: string[]): void {
  fs.writeFileSync('db-metadata.json', JSON.stringify(metadata, null, 4));
  fs.writeFileSync('allcolumntypes.json', JSON.stringify(allColumnTypes, null, 4));
  fs.writeFileSync('zod-schemas.ts', schemaTemplate);
}

const config: Config = {
  logLevel: 'debug',
  outFile: 'zod-schemas.ts',
  dialect: 'postgres',
  camelCase: true,
  serializer: {
    serializeFile: (metadata) => {
      const schemaTemplate = generateSchemaTemplate(metadata);
      const allColumnTypes = findAllColumnTypes(metadata);
      generateFiles(metadata, schemaTemplate, allColumnTypes);
      return schemaTemplate;
    },
  },
};

export default config;
