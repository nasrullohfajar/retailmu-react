export const getMenuNameByPath = (path: string, menu: any[]): string | null => {
  for (const item of menu) {
    if (item.path === path) return item.name;
    if (item.children) {
      const childName = getMenuNameByPath(path, item.children);
      if (childName) return childName;
    }
  }
  return null;
};
