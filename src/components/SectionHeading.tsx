interface SectionHeadingProps {
  eyebrow: string
  title: string
}

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div class="section-heading">
      <div class="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
    </div>
  )
}
