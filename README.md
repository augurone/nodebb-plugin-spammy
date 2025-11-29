# NodeBB Spam Prevention Plugin (Spammy)

A NodeBB plugin that blocks spam registrations using configurable username/email analysis and pattern matching.

## Features

### 1. **Username/Email Blocking**
- Blocks registrations where username matches email address for configurable domains
- Example: Blocks username `john123` with email `john123@gmail.com`

### 2. **Email Pattern Blocking** 
Configure patterns to block via admin panel:
- **Exact**: `spammer@example.com`
- **Wildcard**: `*@spam-domain.com`  
- **Regex**: `/^[a-z]+[0-9]{4}@gmail\.com$/i`

## Installation

1. Install via npm in your NodeBB directory:
   ```bash
   npm install nodebb-plugin-spammy
   ```

2. Activate the plugin in Admin Control Panel > Plugins

3. Configure in Admin Control Panel > Plugins > Spam Prevention

## Configuration

### Username=Email Domains
Add domains (one per line) where you want to block matching username/email:
```
gmail.com
yahoo.com
hotmail.com
```

### Email Patterns
Add patterns (one per line) to block specific emails:
```
*@spam-domain.com
/^[a-z]{4}[0-9]{4}@.*$/i
baduser@example.com
```

## Pattern Types

- **Exact Match**: Block a specific email address
- **Wildcard**: Use `*` to match any characters  
- **Regular Expression**: Advanced pattern matching with `/pattern/flags`

## Technical Details

- **NodeBB Compatibility**: 3.0.0+
- **Hook**: `filter:user.create` (blocks at registration time)
- **Logging**: All blocking events are logged for monitoring

## License

MIT License
