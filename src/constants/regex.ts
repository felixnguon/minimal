const regex = {
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  version: /^(\d+\.)?(\d+\.)?(\*|\d+)$/,
}

export default regex
