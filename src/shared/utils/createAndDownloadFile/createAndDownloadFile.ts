export function createAndDownloadFile(
  csvContent: string,
  selectedItemsLength: number
): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const filename = `${selectedItemsLength}_selected_items.csv`;

  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
