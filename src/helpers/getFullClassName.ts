function getFullClassName(currentClassName: string, additionalClassName?: string): string {
  return additionalClassName ? `${currentClassName} ${additionalClassName}` : currentClassName;
}

export default getFullClassName;
