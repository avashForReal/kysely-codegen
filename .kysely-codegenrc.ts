import fs from 'fs';
import { Config } from './src/cli/config';
import { toKyselyCamelCase } from './src/generator';

const config: Config = {
  logLevel: 'debug',
  outFile: 'zod-schemas.ts',
  dialect: 'postgres',
  camelCase: true,
  serializer: {
    serializeFile: (metadata) => {
      let output = 'import { z } from "zod";\n\n';

      const allcolumntypes: string[] = [];

      for (const table of metadata.tables) {
        output += 'export const ';
        output += toKyselyCamelCase(table.name);
        output += 'Schema = z.object({\n';

        for (const column of table.columns) {
          if (!column.enumValues && !column.isArray) {
            allcolumntypes.push(column.dataType);
          }

          output += '  ';
          output += column.name;
          output += ': ';
          switch (column.dataType) {
            case 'int2':
            case 'int4':
            case 'int8':
              output += 'z.number().int()';
              break;
            case 'float4':
            case 'float8':
            case 'numeric':
              output += 'z.number()';
              break;
            case 'character varying':
            case 'varchar':
            case 'text':
            case 'char':
              output += 'z.string()';
              break;
            case 'boolean':
              output += 'z.boolean()';
              break;
            case 'date':
            case 'timestamp':
            case 'timestamptz':
            case 'time':
            case 'timetz':
              output += 'z.date()';
              break;
            case 'interval':
              output += 'z.unknown()';
              break;
            case 'bytea':
              output += 'z.instanceof(Buffer)';
              break;
            case 'json':
            case 'jsonb':
              output += 'z.unknown()';
              break;
            case 'uuid':
              output += 'z.string().uuid()';
              break;
            case 'cidr':
            case 'inet':
            case 'macaddr':
              output += 'z.string()';
              break;
            case 'array':
              output += 'z.array(z.unknown())';
              break;
            case 'enum':
              output += `z.enum([/*enumValues*/])`;
              break;
            case 'point':
              output += 'z.tuple([z.number(), z.number()])';
              break;
            case 'polygon':
              output += 'z.array(z.tuple([z.number(), z.number()]))';
              break;
            case 'circle':
              output += 'z.tuple([z.number(), z.number(), z.number()])';
              break;
            default:
              output += 'z.unknown()';
          }

          output += ',\n';
        }

        output += '});\n\n';
      }

      fs.writeFileSync('db-metadata.json', JSON.stringify(metadata, null, 4));
      fs.writeFileSync(
        'allcolumntypes.json',
        JSON.stringify([...new Set(allcolumntypes)], null, 4),
      );
      return output;
    },
  },
};

export default config;
