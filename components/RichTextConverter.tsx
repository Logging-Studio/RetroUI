import Image from 'next/image'
import Link from 'next/link'
import type {
  DefaultNodeTypes,
  SerializedUploadNode,
  SerializedBlockNode,
} from '@payloadcms/richtext-lexical'
import {
  type JSXConvertersFunction,
  RichText,
} from '@payloadcms/richtext-lexical/react'
import { Text } from '@/components/retroui'
import { cn } from '@/lib/utils'
import { RichTextCodeBlock } from '@/components/RichTextCodeBlock'

const CustomUploadComponent: React.FC<{
  node: SerializedUploadNode
}> = ({ node }) => {
  if (node.relationTo === 'media') {
    const uploadDoc = node.value
    if (typeof uploadDoc !== 'object') {
      return null
    }
    const { alt, height, url, width } = uploadDoc
    return (
      <img
        alt={alt}
        height={height}
        src={`https://cms.retroui.dev${url}`}
        width={width}
        className="mx-auto w-full max-w-[600px] my-8"
      />
    )
  }

  return null
}

type NodeTypes = DefaultNodeTypes
export const JSXConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => {
  return {
    ...defaultConverters,
    heading: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      const Tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      const classNames: Record<string, string> = {
        h1: '',
        h2: 'mb-4 mt-8 lg:text-3xl',
        h3: 'mb-4',
        h4: 'mb-2',
        h5: '',
        h6: '',
      }
      return (
        <Text as={Tag} className={classNames[Tag]}>
          {children}
        </Text>
      )
    },
    paragraph: ({ node, nodesToJSX }) => {
      // Handle empty paragraphs as spacing
      if (!node.children || node.children.length === 0) {
        return <br />
      }
      const children = nodesToJSX({ nodes: node.children })
      return <Text className="text-lg text-foreground">{children}</Text>
    },
    text: ({ node }) => {
      const format = node.format ?? 0
      let text: React.ReactNode = node.text

      // Format is a bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code
      if (format & 16) {
        // Inline code
        text = (
          <code className="rounded-sm bg-[#282A36] px-1.5 py-0.5 text-primary text-sm">
            {text}
          </code>
        )
      }
      if (format & 1) {
        text = <strong>{text}</strong>
      }
      if (format & 2) {
        text = <em>{text}</em>
      }
      if (format & 4) {
        text = <s>{text}</s>
      }
      if (format & 8) {
        text = <u>{text}</u>
      }

      return <>{text}</>
    },
    list: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      if (node.listType === 'bullet') {
        return <ul className="list-disc pl-4 lg:pl-8 my-4">{children}</ul>
      }
      return <ol className="list-decimal pl-4 lg:pl-8 my-4">{children}</ol>
    },
    listitem: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      return (
        <Text as="li" className="text-lg text-foreground ml-4 lg:ml-8 mb-2">
          {children}
        </Text>
      )
    },
    link: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      const href = node.fields?.url || ''
      const isExternal = href.startsWith('http')
      const linkClass = 'underline underline-offset-4 hover:decoration-primary'

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {children}
          </a>
        )
      }

      return (
        <Link href={href} className={linkClass}>
          {children}
        </Link>
      )
    },
    quote: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      return (
        <blockquote className="border-l-4 border-primary pl-4 my-4 italic">
          {children}
        </blockquote>
      )
    },
    linebreak: () => {
      return <br />
    },
    upload: ({ node }) => {
      return <CustomUploadComponent node={node} />
    },
    // Handle autolink nodes
    autolink: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: (node as any).children })
      const href = (node as any).fields?.url || ''
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:decoration-primary break-all"
        >
          {children}
        </a>
      )
    },
    // Blocks converter - nested object with slug as key
    blocks: {
      Code: ({ node }: any) => {
        const fields = (node as any).fields
        return (
          <RichTextCodeBlock
            code={fields?.code || ''}
            language={fields?.language}
            title={fields?.blockName}
          />
        )
      },
    },
  }
}