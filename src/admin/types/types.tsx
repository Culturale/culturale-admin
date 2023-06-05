import type { Types } from 'mongoose';

export type MongoId = Types.ObjectId;

export type CategoriaEnum =
| 'agenda:categories/activitats-virtuals'
| 'agenda:categories/exposicions'
| 'agenda:categories/concerts'
| 'agenda:categories/teatre'
| 'agenda:categories/festivals-i-mostres'
| 'agenda:categories/rutes-i-visites'
| 'agenda:categories/infantil'
| 'agenda:categories/festes'
| 'agenda:categories/conferencies'
| 'agenda:categories/fires-i-mercats'
| 'agenda:categories/dansa'
| 'agenda:categories/cicles';
