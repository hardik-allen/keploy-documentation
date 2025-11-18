import type { MDXComponents } from 'mdx/types'
import React from 'react'
import Callout from '@/components/Callout'
import WhyBox from '@/components/WhyBox'

const components: MDXComponents = {
  Callout,
  WhyBox,
}

export function useMDXComponents(): MDXComponents {
  return components
}