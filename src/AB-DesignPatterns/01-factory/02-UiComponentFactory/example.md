# Factory Pattern - UI Component Factory Example

## Overview
This example demonstrates how the Factory Pattern enables dynamic UI component creation with multiple themes (Material Design, Fluent UI) and platform-specific optimizations (desktop, mobile, tablet) while maintaining consistent APIs and type safety.

## Scenario
A modern web application needs to support multiple UI themes to match corporate branding requirements and provide platform-optimized user experiences. The marketing team wants Material Design for consumer-facing pages, while enterprise clients prefer Fluent UI. Additionally, the application must provide touch-optimized interfaces for mobile devices and hover-based interactions for desktop users. The development team needs to switch themes and platforms without rewriting component code.

## Step-by-Step Implementation

### Step 1: Component Interface Design
```typescript
interface UIComponent {
  render(): HTMLElement;
  update(props: ComponentProps): void;
  destroy(): void;
  addEventListener(event: string, handler: EventHandler): void;
  removeEventListener(event: string, handler: EventHandler): void;
  getComponentInfo(): ComponentInfo;
}

interface ButtonProps extends ComponentProps {
  readonly text: string;
  readonly onClick?: EventHandler;
  readonly icon?: string;
  readonly loading?: boolean;
  readonly type?: ButtonType;
}

type ComponentFactory<T extends UIComponent> = {
  createComponent(type: ComponentType, props: ComponentProps): T;
  getSupportedTypes(): ComponentType[];
  getThemeInfo(): ThemeInfo;
};
```

**Explanation:** The interface design provides a unified contract for all UI components regardless of theme or platform. `UIComponent` defines essential lifecycle methods, while specific prop interfaces like `ButtonProps` ensure type safety for component-specific properties. The generic `ComponentFactory<T>` interface enables theme-specific implementations while maintaining consistent creation APIs.

### Step 2: Abstract Base Class Implementation
```typescript
abstract class BaseUIComponent implements UIComponent {
  protected element: HTMLElement | null = null;
  protected state: ComponentState = ComponentState.CREATED;
  protected eventListeners: Map<string, EventHandler[]> = new Map();
  
  constructor(
    protected props: ComponentProps,
    protected theme: ThemeType,
    protected platform: Platform
  ) {}
  
  public addEventListener(event: string, handler: EventHandler): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(handler);
    
    if (this.element) {
      this.element.addEventListener(event, handler);
    }
  }
  
  protected applyThemeStyles(element: HTMLElement): void {
    const themeClass = `${this.theme}-theme`;
    const platformClass = `${this.platform}-platform`;
    element.classList.add(themeClass, platformClass);
  }
}
```

**Explanation:** The abstract base class provides common functionality like event listener management, theme styling application, and component state tracking. The event listener system allows registration before rendering and automatic attachment during render. This Template Method pattern ensures consistent behavior while allowing theme-specific customizations.

### Step 3: Theme-Specific Component Implementation
```typescript
class MaterialButton extends BaseUIComponent {
  constructor(private buttonProps: ButtonProps, platform: Platform) {
    super(buttonProps, 'material', platform);
  }
  
  public render(): HTMLElement {
    const button = document.createElement('button');
    button.className = `md-button md-button--${this.props.variant || 'primary'}`;
    button.textContent = this.buttonProps.text;
    
    this.applyThemeStyles(button);
    this.addRippleEffect(button);
    
    if (this.buttonProps.onClick) {
      button.addEventListener('click', this.buttonProps.onClick);
    }
    
    this.element = button;
    this.state = ComponentState.RENDERED;
    this.attachEventListeners();
    
    return button;
  }
  
  private addRippleEffect(button: HTMLElement): void {
    if (this.platform === 'desktop') {
      button.addEventListener('click', (e) => {
        // Ripple effect implementation for desktop
        const ripple = document.createElement('span');
        ripple.className = 'md-ripple';
        // ... ripple animation code
      });
    }
  }
}
```

**Explanation:** Theme-specific implementations handle the visual appearance and interaction patterns unique to each design system. Material Design buttons include ripple effects for desktop platforms, while maintaining the common component interface. Platform-specific optimizations ensure appropriate user experiences across different devices.

### Step 4: Factory Implementation
```typescript
class MaterialDesignFactory implements ComponentFactory<UIComponent> {
  constructor(private platform: Platform) {}
  
  public createComponent(type: ComponentType, props: ComponentProps): UIComponent {
    switch (type) {
      case 'button':
        return new MaterialButton(props as ButtonProps, this.platform);
      case 'input':
        return new MaterialInput(props as InputProps, this.platform);
      default:
        throw new Error(`Material Design factory does not support component type: ${type}`);
    }
  }
  
  public getSupportedTypes(): ComponentType[] {
    return ['button', 'input'];
  }
  
  public getThemeInfo(): ThemeInfo {
    return {
      name: 'Material Design',
      version: '3.0',
      platform: this.platform,
      colorScheme: 'auto'
    };
  }
}
```

**Explanation:** Each theme factory encapsulates the creation logic for components within that design system. The factory validates supported component types and provides theme-specific metadata. Platform information is injected during factory creation, enabling platform-optimized component creation.

### Step 5: Main Factory Coordination
```typescript
class UIComponentFactory {
  private static factories = new Map<string, ComponentFactory<UIComponent>>();
  private static currentTheme: ThemeType = 'material';
  private static currentPlatform: Platform = 'desktop';
  
  public static createComponent<T extends UIComponent>(
    type: ComponentType,
    props: ComponentProps,
    theme?: ThemeType
  ): T {
    const factoryTheme = theme || this.currentTheme;
    const factory = this.factories.get(factoryTheme);
    
    if (!factory) {
      throw new Error(`No factory registered for theme: ${factoryTheme}`);
    }
    
    const supportedTypes = factory.getSupportedTypes();
    if (!supportedTypes.includes(type)) {
      throw new Error(`Theme ${factoryTheme} does not support component type: ${type}`);
    }
    
    return factory.createComponent(type, props) as T;
  }
  
  public static registerFactory(theme: ThemeType, factory: ComponentFactory<UIComponent>): void {
    this.factories.set(theme, factory);
  }
}
```

**Explanation:** The main factory coordinates between different theme factories and provides a unified interface for component creation. It validates theme availability and component type support before delegating to appropriate theme factories. The registration system enables runtime extensibility for new themes.

## Execution Flow

### Scenario 1: Basic Component Creation with Theme
1. Application calls `UIComponentFactory.initialize('material', 'desktop')`
2. Factory registers Material Design and Fluent UI factories with desktop platform
3. Application requests button creation: `createComponent<MaterialButton>('button', buttonProps)`
4. Factory looks up Material Design factory and validates button support
5. Material Design factory creates MaterialButton instance with desktop optimizations
6. Component renders with Material Design styling and desktop-specific ripple effects

**Code Flow:**
```typescript
// 1. Factory initialization with theme and platform
UIComponentFactory.initialize('material', 'desktop');

// 2. Component creation with type safety
const button = UIComponentFactory.createComponent<MaterialButton>('button', {
  text: 'Click Me',
  variant: 'primary',
  onClick: () => console.log('Button clicked!')
} as ButtonProps);

// 3. Component rendering with theme-specific styling
const buttonElement = button.render(); // Returns HTMLElement with Material Design styling
document.body.appendChild(buttonElement);

// 4. Component info provides metadata
console.log(button.getComponentInfo()); // { type: 'button', theme: 'material', platform: 'desktop', ... }
```

### Scenario 2: Dynamic Theme Switching and Multi-Platform Support
1. Application creates components with different themes simultaneously
2. Some components use default theme, others specify explicit themes
3. Platform-specific optimizations are applied based on factory configuration
4. Components maintain consistent APIs despite different implementations
5. Event handling and lifecycle management work uniformly across themes

**Code Flow:**
```typescript
// 1. Create components with different themes
const materialButton = UIComponentFactory.createComponent<MaterialButton>('button', {
  text: 'Material Button',
  variant: 'primary'
} as ButtonProps); // Uses default Material theme

const fluentButton = UIComponentFactory.createComponent<FluentButton>('button', {
  text: 'Fluent Button',
  variant: 'secondary'
} as ButtonProps, 'fluent'); // Explicitly uses Fluent theme

// 2. Platform-specific behaviors are applied automatically
const materialInput = UIComponentFactory.createComponent<MaterialInput>('input', {
  placeholder: 'Enter your name',
  type: 'text',
  onChange: (e) => console.log('Input changed:', (e.target as HTMLInputElement).value)
} as InputProps);

// 3. Consistent component lifecycle across themes
const materialEl = materialButton.render(); // Material Design styling
const fluentEl = fluentButton.render(); // Fluent UI styling
const inputEl = materialInput.render(); // Material Design input with floating label

// 4. Uniform event handling and updates
materialButton.addEventListener('click', customHandler);
fluentButton.update({ text: 'Updated Fluent Button' } as ButtonProps);
```

## Benefits in This Use Case

- **Theme Flexibility**: Applications can support multiple design systems simultaneously and switch themes based on user preferences or business requirements without code changes.

- **Platform Optimization**: Components automatically adapt to platform-specific interaction patterns (touch vs. mouse, mobile vs. desktop sizing) while maintaining consistent APIs.

- **Type Safety**: TypeScript generics and interfaces provide compile-time validation of component types and properties, preventing runtime errors and improving developer experience.

- **Consistent Architecture**: All components follow the same lifecycle, event handling, and update patterns regardless of their visual implementation.

- **Runtime Extensibility**: New themes can be added through factory registration without modifying existing component or application code.

## Common Pitfalls and Solutions

- **Pitfall:** Creating components directly instead of using the factory
  **Solution:** Always use `UIComponentFactory.createComponent()` to ensure proper theme application and platform optimization.

- **Pitfall:** Not handling unsupported component types gracefully
  **Solution:** Use `getSupportedTypes()` to check component availability before creation, and provide fallback mechanisms.

- **Pitfall:** Memory leaks from improper event listener cleanup
  **Solution:** Always call `destroy()` when components are no longer needed, and use the built-in event listener management system.

## Performance Considerations

The factory pattern adds minimal overhead while providing substantial benefits. Component creation is efficient through factory lookup and validation. Platform-specific optimizations (like conditional ripple effects) ensure optimal performance on each platform. Event listener management prevents memory leaks in dynamic applications.

## Testing Strategy

```typescript
// Mock factory for testing
class MockUIFactory implements ComponentFactory<UIComponent> {
  createComponent(type: ComponentType, props: ComponentProps): UIComponent {
    return new MockComponent(type, props);
  }
  
  getSupportedTypes(): ComponentType[] {
    return ['button', 'input', 'modal'];
  }
  
  getThemeInfo(): ThemeInfo {
    return { name: 'Mock', version: '1.0', platform: 'test', colorScheme: 'light' };
  }
}

// Register mock factory for testing
UIComponentFactory.registerFactory('mock' as ThemeType, new MockUIFactory());

// Test component creation without real DOM manipulation
const mockButton = UIComponentFactory.createComponent('button', testProps, 'mock');
```

## Integration with Other Patterns

The Factory Pattern integrates seamlessly with other UI patterns:

- **Observer Pattern**: Components can publish theme change events to update existing components
- **Strategy Pattern**: Different animation and interaction strategies can be applied based on platform
- **Decorator Pattern**: Additional features (like tooltips, validation) can be added to components without changing factory code
- **Composite Pattern**: Complex components can be built by combining simpler factory-created components
