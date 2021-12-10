function formatMessage(query) {
  return query.map((messageData) => {
    // eslint-disable-next-line camelcase
    const { id, firstname, lastname, messages } = messageData;

    const data = {
      id,
      name: `${firstname} ${lastname}`,
      message:
        messages.map((message) =>
          !message ? null : message[message.length - 1]
        ) || [],
    };

    return data;
  });
}

module.exports = formatMessage;
