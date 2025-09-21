import { z } from 'zod'

export const LabelDefSchema = z.object({
  col: z.number().int(),
  row: z.number().int(),
  text: z.string(),
})

export const SeriesSchema = z.object({
  tapetype: z.string(),
  suffix: z.string().toUpperCase(),
  labels: LabelDefSchema.array(),
})

export const DesignSchema = z.object({
  borders: z.boolean(),
  colorized: z.boolean(),
  textOrientation: z.enum(['horizontal', 'vertical']),
  textPosition: z.enum(['top', 'bottom']),
})

export const LabelSchema = z.object({
  tapetype: z.string(),
  prefix: z.string().toUpperCase(),
  startno: z.string(),
  suffix: z.string().toUpperCase(),
  fillpage: z.boolean(),
  num: z.number().int().min(1).max(999),
})

export const LayoutSchema = z.object({
  pagesize: z.enum(['a4', 'letter']),
  marginLeft: z.number(),
  marginTop: z.number(),
  cols: z.number().positive().int(),
  rows: z.number().positive().int(),
  spacingCol: z.number(),
  spacingRow: z.number(),
})

export const BarcodeSchema = z.object({
  design: DesignSchema,
  labels: LabelSchema.array(),
  layout: LayoutSchema,
})

export type LabelDef = z.infer<typeof LabelDefSchema>
export type Series = z.infer<typeof SeriesSchema>

export type Label = z.infer<typeof LabelSchema>
export type Design = z.infer<typeof DesignSchema>
export type Layout = z.infer<typeof LayoutSchema>
export type Barcode = z.infer<typeof BarcodeSchema>
