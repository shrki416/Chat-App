function formatMessage(query) {
  return query.map((messageData) => {
    // eslint-disable-next-line camelcase
    const { id, firstname, lastname, last_active_at, messages } = messageData;

    const data = {
      id,
      name: `${firstname} ${lastname}`,
      active: last_active_at,
      message: messages.map((message) => message[message.length - 1]) || [],
    };

    return data;
  });
}

module.exports = formatMessage;
