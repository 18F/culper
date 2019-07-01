const revoked = {
  // TODO >= DOB, <= NOW
  Date: { presence: true, date: true },
  Agency: { presence: true, hasValue: true },
  Explanation: { presence: true, hasValue: true },
}

export default revoked
