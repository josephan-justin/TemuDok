function formatStatus(status) {
  if (!status) return "-"

  return status.charAt(0).toUpperCase() + status.slice(1)
}

module.exports = formatStatus