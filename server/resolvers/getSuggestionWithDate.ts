interface Arguments {
  items: string[]
}

const resolver = (_: any, args: Arguments) => args.items.map((suggestion: string) => `${suggestion} - ${new Date().toISOString()}`); 

export default resolver;