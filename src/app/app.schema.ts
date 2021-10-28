export const loginSchema = {
  'type': 'object',
  'title': 'Please Login',
  'properties': {
    'password': {
      'title': 'Password',
      'type': 'password',
      'required': true
    },
    'rememberMe': {
      'title': 'Remember me!',
      'type': 'boolean'
    }
  }
};

export const fullSchema = {
  'type': 'object',
  'title': 'All fields',
  'properties': {
    'text': {
      'title': 'Text field',
      'type': 'string'
    },
    'password': {
      'title': 'Password',
      'type': 'password',
      'required': true
    },
    'checkbox': {
      'title': 'Checkbox',
      'type': 'boolean'
    },
    'publish-account': {
      'title': 'Publish Account field (Mediacoder only)',
      'type': 'publish-account'
    },
    'channel-oid': {
      'title': 'MS Channel field',
      'type': 'channel-oid'
    },
    'live-oid': {
      'title': 'MS Live field',
      'type': 'live-oid'
    },
    'number': {
      'title': 'Number field',
      'type': 'number'
    },
    'file': {
      'title': 'File field',
      'type': 'file'
    }
  }
}