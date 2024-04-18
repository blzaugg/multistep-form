/* Custom file. */

/**
 * Reads a file blob and returns it's encoded Data URL.
 *
 * Eg. `data:image/png;base64,ABCxyz123...`
 */
export async function fileBlobToDataUrl(blob: Blob): Promise<string> {
  const fileReader = new FileReader()
  fileReader.readAsDataURL(blob)

  return new Promise((resolve, reject) => {
    fileReader.onload = () => {
      if (fileReader.result == null || typeof fileReader.result != 'string') {
        reject(new Error('Image failed to load'))
        return
      }

      resolve(fileReader.result)
    }
  })
}
