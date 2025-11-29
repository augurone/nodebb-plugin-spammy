# NodeBB Spam Prevention Plugin (Spammy)

A robust NodeBB plugin that blocks spam registrations using intelligent username/email analysis and configurable pattern matching.

## Current Status ✅

**Working Features:**
- ✅ **Gmail Username Blocking**: Specifically blocks Gmail registrations where username exactly matches email local-part (e.g., "teim0093" + "teim0093@gmail.com")
- ✅ **Pattern-Based Email Blocking**: Supports exact matches, wildcards, and regex patterns
- ✅ **Admin Interface**: Easy-to-use configuration panel at `/admin/plugins/spammy`
- ✅ **Comprehensive Logging**: All blocking events logged for monitoring
- ✅ **Multiple Pattern Types**: Flexible system for evolving spam patterns

**Battle Tested**: Successfully deployed and blocking real spam registrations on production NodeBB forums.

## Core Features

### 1. **Smart Username/Email Blocking**
- **Primary Rule**: Blocks Gmail addresses when username = email local-part
  - Catches: `gulbhahar36` / `gulbhahar36@gmail.com`
  - Catches: `romanreigns1186` / `romanreigns1186@gmail.com`
  - Allows: `john_doe` / `john.smith@gmail.com` (different username/email)

### 2. **Flexible Pattern System**
Configure custom email patterns via admin panel:
- **Exact**: `spammer@example.com`
- **Wildcard**: `*@spam-domain.com`  
- **Regex**: `/^[a-z]+[0-9]{4}@gmail\.com$/i` (names + 4 digits on Gmail)

### 3. **Production Ready**
- Proper error handling and user feedback
- Extensive logging for spam analysis
- Clean admin interface integrated with NodeBB's settings system

### Contributing
This plugin evolved from real-world spam fighting experience. We welcome:
- New pattern suggestions based on your spam data
- Feature requests for your specific use cases
- Bug reports and performance improvements
- Documentation enhancements

### Pattern Examples
The flexible pattern system allows you to block various spam signatures as they emerge:

```bash
# Regex patterns for common spam formats
/^[a-z]+[0-9]{3,6}@gmail\.com$/i

# Wildcard patterns for domains
*@suspicious-domain.com

# Business terms on personal email providers
/^.*(?:inc|corp|official).*@gmail\.com$/i
```

## Installation & Quick Start

1. Install via npm in your NodeBB directory:
   ```bash
   npm install nodebb-plugin-spammy
   ```

2. Activate the plugin in the ACP (Admin Control Panel) under Plugins

3. Configure patterns in ACP > Plugins > Spam Prevention

## Configuration

Navigate to `/admin/plugins/spammy` in your NodeBB admin panel.

Add email patterns (one per line) that you want to block:

```
*@spam-domain.com
*@another-spam.net
/^[a-z]{4}[0-9]{4}@.*$/i
baduser@example.com
```

### Pattern Types

- **Exact Match**: Block a specific email address
  - Example: `spammer@example.com`

- **Wildcard**: Use `*` to match any characters
  - Example: `*@spam-domain.com` blocks all emails from that domain
  - Example: `spam*@example.com` blocks emails starting with "spam"

- **Regular Expression**: Advanced pattern matching with `/pattern/flags`
  - Example: `/^[a-z]{4}[0-9]{4}@.*$/i` blocks emails like "abcd1234@anything.com"
  - Flags: `i` for case-insensitive, `g` for global, etc.

## Technical Details

**NodeBB Compatibility**: 3.0.0+
**Hook Used**: `filter:user.create` (registration-time blocking)
**Dependencies**: Uses NodeBB's built-in settings and logging systems

### How It Works
1. Intercepts user registration via NodeBB's `filter:user.create` hook
2. Extracts email/username from registration data
3. Applies Gmail username=localpart rule first (primary spam vector)
4. Checks email against configured patterns (secondary filtering)
5. Throws error to block registration or allows registration to proceed
6. Logs all decisions for spam analysis

### Data Structure
The plugin accesses registration data through:
```javascript
const email = data.data.email;      // User's email address
const username = data.data.username; // User's chosen username
```

## Development & Deployment

### From Source (Development)
```bash
cd /path/to/nodebb
git clone https://github.com/augurone/nodebb-plugin-spammy node_modules/nodebb-plugin-spammy
cd node_modules/nodebb-plugin-spammy
npm install
./nodebb build  # Rebuild NodeBB
```

### Testing
The plugin includes comprehensive logging. Monitor effectiveness via NodeBB logs:
```bash
# Check recent spam blocking activity
grep "spammy.*BLOCKED" logs/output.log | tail -10
```

---

## License

MIT License - Feel free to use, modify, and distribute.

## Support

- **Issues**: [GitHub Issues](https://github.com/augurone/nodebb-plugin-spammy/issues)
- **NodeBB Community**: [NodeBB Community Forum](https://community.nodebb.org)
- **Real-World Tested**: This plugin is actively protecting production NodeBB forums

---
