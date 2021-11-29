function formatMessage(query) {
  return query.map((messageData) => {
    const { id, firstname, lastname, email, messages } = messageData;

    const data = {
      id,
      name: `${firstname} ${lastname}`,
      email,
      message: messages.map((message) => message[message.length - 1]) || [],
    };

    return data;
  });
}

module.exports = formatMessage;
