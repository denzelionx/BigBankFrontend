/**
 * This class provides functionalities regarding files.
 */
class FormFiles {
  /**
   * Handles the PDF file upload event, reads the file as an ArrayBuffer,
   * converts it to a Base64 string, and assigns it to the formData.copyOfId.
   * Only accepts PDF files.
   * @param {Event} event - The file upload event.
   */
  handlePdfUpload(event) {
    const file = event.target.files[0]
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader()

      reader.onload = (e) => {
        const arrayBuffer = e.target.result
        this.formData.request.copyOfId = btoa(
          String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))
        )
      }

      reader.readAsArrayBuffer(file)
    } else {
      alert('Please upload a valid PDF file')
    }
  }

  /**
   * Handles the JSON file upload event, reading a JSON file and updating formData properties.
   * Existing properties in formData will be overwritten.
   *
   * @param {Event} event - The change event triggered by the file input.
   */
  handleJsonUpload(event) {
    const file = event.target.files[0]
    if (file && file.type === 'application/json') {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const jsonContent = JSON.parse(e.target.result)
          Object.assign(this.formData.request, jsonContent)
        } catch (error) {
          console.error('Error parsing JSON file:', error)
          alert('Invalid JSON file')
        }
      }

      reader.readAsText(file)
    } else {
      alert('Please upload a valid JSON file')
    }
  }
}

export default FormFiles
