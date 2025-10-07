# Contributing to Core-Zodiac

Thank you for your interest in contributing to Core-Zodiac! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers
- Be patient with questions
- Focus on constructive feedback
- Respect differing viewpoints

## How to Contribute

### Reporting Bugs

Before creating a bug report:
1. Check the existing issues to avoid duplicates
2. Verify the bug exists in the latest version
3. Collect as much information as possible

When creating a bug report, include:
- Clear, descriptive title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, versions)

**Bug Report Template:**
```markdown
## Description
A clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- OS: [e.g., Windows 10, macOS 12]
- Browser: [e.g., Chrome 96, Firefox 95]
- Version: [e.g., 1.0.0]

## Screenshots
If applicable, add screenshots.

## Additional Context
Any other relevant information.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear, descriptive title
- Provide a detailed description of the proposed feature
- Explain why this enhancement would be useful
- List any alternative solutions you've considered

**Feature Request Template:**
```markdown
## Feature Description
A clear description of the feature.

## Problem Statement
What problem does this solve?

## Proposed Solution
How should it work?

## Alternatives Considered
What other solutions did you consider?

## Additional Context
Any other relevant information.
```

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/Imerhaba2025/Core-Zodiac.git
   cd Core-Zodiac
   git remote add upstream https://github.com/Imerhaba2025/Core-Zodiac.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the code style guide
   - Add tests for new features
   - Update documentation as needed

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: amazing feature"
   ```

   **Commit Message Format:**
   ```
   Type: Brief description

   Detailed description (optional)

   Fixes #123
   ```

   **Types:**
   - `Add:` New feature
   - `Fix:` Bug fix
   - `Update:` Update existing feature
   - `Refactor:` Code refactoring
   - `Docs:` Documentation changes
   - `Test:` Test changes
   - `Style:` Code style changes
   - `Chore:` Maintenance tasks

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Create a Pull Request**
   - Go to the repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

**Pull Request Template:**
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added
- [ ] All tests pass
```

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Core-Zodiac.git
   cd Core-Zodiac
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.local.example frontend/.env.local
   ```

4. **Set up the database**
   ```bash
   cd backend
   npx prisma migrate dev
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

## Code Style Guide

### TypeScript

- Use TypeScript for all new code
- Define explicit types, avoid `any`
- Use interfaces for object shapes
- Document complex functions with JSDoc

**Example:**
```typescript
/**
 * Creates a new user in the database
 * @param userData - User registration data
 * @returns Promise resolving to created user
 */
async function createUser(userData: UserData): Promise<User> {
  // Implementation
}
```

### Naming Conventions

- **Files**: `camelCase.ts` or `PascalCase.tsx` for components
- **Variables/Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Components**: `PascalCase`
- **Interfaces**: `PascalCase` with `I` prefix or descriptive name

### Code Formatting

We use Prettier for code formatting:
```bash
npm run format
```

Configuration is in `.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

### Linting

We use ESLint for code linting:
```bash
npm run lint
```

Fix linting errors:
```bash
npm run lint:fix
```

## Testing Guidelines

### Writing Tests

- Write tests for all new features
- Maintain existing test coverage
- Use descriptive test names
- Follow AAA pattern: Arrange, Act, Assert

**Example:**
```typescript
describe('User Authentication', () => {
  it('should register a new user successfully', async () => {
    // Arrange
    const userData = { email: 'test@example.com', password: 'password123' };
    
    // Act
    const result = await registerUser(userData);
    
    // Assert
    expect(result).toHaveProperty('id');
    expect(result.email).toBe(userData.email);
  });
});
```

### Running Tests

```bash
# All tests
npm test

# Backend tests only
cd backend && npm test

# Frontend tests only
cd frontend && npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage
```

## Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Document complex logic
- Include usage examples
- Keep documentation up to date

### README Updates

- Update README.md when adding features
- Add new dependencies to the list
- Update setup instructions if needed

### API Documentation

- Document all API endpoints
- Include request/response examples
- Document error responses
- Update docs/API.md

## Git Workflow

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/what-changed` - Documentation
- `refactor/what-refactored` - Refactoring
- `test/what-tested` - Tests

### Keeping Your Fork Updated

```bash
# Add upstream remote (one time)
git remote add upstream https://github.com/Imerhaba2025/Core-Zodiac.git

# Fetch upstream changes
git fetch upstream

# Merge upstream changes
git checkout main
git merge upstream/main

# Update your fork
git push origin main
```

### Rebasing

Before submitting a PR, rebase on main:
```bash
git checkout main
git pull upstream main
git checkout feature/your-feature
git rebase main
```

## Review Process

1. **Automated Checks**
   - Linting passes
   - Tests pass
   - Build succeeds

2. **Code Review**
   - At least one approval required
   - Address all review comments
   - Keep discussions focused

3. **Merge**
   - Squash commits if needed
   - Update PR description
   - Celebrate! 🎉

## Community

### Getting Help

- GitHub Discussions for questions
- GitHub Issues for bugs
- Discord/Slack for real-time chat (if available)

### Recognition

Contributors are recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project README

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to reach out:
- Open a discussion on GitHub
- Contact maintainers
- Join our community chat

Thank you for contributing to Core-Zodiac! 🚀
