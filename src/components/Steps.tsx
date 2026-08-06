import type { ComponentChildren } from 'preact'

export function Steps({ items }: { items: ComponentChildren[] }) {
  return (
    <ol class="steps">
      {items.map((text, i) => (
        <li class="steps__item" key={i}>
          <span class="steps__num">{i + 1}</span>
          <p>{text}</p>
        </li>
      ))}
    </ol>
  )
}
