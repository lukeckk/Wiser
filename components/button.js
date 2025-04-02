import { sizes, variants } from "@/lib/variants"

export default function Button({ children, variant, size, ...props }) {
  return (
    <button
      {...props}
      className={`${variant ? variants[variant] : variants['default']} ${size ? sizes[size] : sizes['base']}`}
    >
      {children}
    </button>
  )
}