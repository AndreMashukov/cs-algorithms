// Design Pattern: Factory Pattern
// Real-World Use Case: UI Component Factory
// Description: A factory system that creates different UI components based on theme, platform, and configuration
//
// Problem Statement:
// Modern web applications need to support multiple UI themes (Material Design, Fluent UI, Custom)
// and render components optimized for different platforms (desktop, mobile, tablet). Creating
// components directly in application code creates tight coupling and makes it difficult to
// switch themes or add new component variants.
//
// Solution Overview:
// The Factory Pattern encapsulates UI component creation logic, allowing the application to
// request components without knowing the specific implementation details. This enables
// dynamic theming, platform-specific optimizations, and consistent component APIs.

// Interfaces and Types
interface UIComponent {
  render(): HTMLElement;
  update(props: ComponentProps): void;
  destroy(): void;
  addEventListener(event: string, handler: EventHandler): void;
  removeEventListener(event: string, handler: EventHandler): void;
  getComponentInfo(): ComponentInfo;
}

interface ComponentProps {
  readonly id?: string;
  readonly className?: string;
  readonly style?: Partial<CSSStyleDeclaration>;
  readonly disabled?: boolean;
  readonly variant?: ComponentVariant;
  readonly size?: ComponentSize;
  readonly data?: Record<string, unknown>;
}

interface ButtonProps extends ComponentProps {
  readonly text: string;
  readonly onClick?: EventHandler;
  readonly icon?: string;
  readonly loading?: boolean;
  readonly type?: ButtonType;
}

interface InputProps extends ComponentProps {
  readonly placeholder?: string;
  readonly value?: string;
  readonly type?: InputType;
  readonly onChange?: EventHandler;
  readonly onFocus?: EventHandler;
  readonly onBlur?: EventHandler;
  readonly validation?: ValidationRule[];
}

interface ModalProps extends ComponentProps {
  readonly title: string;
  readonly content: string | HTMLElement;
  readonly onClose?: EventHandler;
  readonly backdrop?: boolean;
  readonly keyboard?: boolean;
  readonly width?: string;
  readonly height?: string;
}

type ComponentType = 'button' | 'input' | 'modal' | 'card' | 'dropdown';
type ThemeType = 'material' | 'fluent' | 'custom';
type Platform = 'desktop' | 'mobile' | 'tablet';
type ComponentVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
type ComponentSize = 'small' | 'medium' | 'large';
type ButtonType = 'button' | 'submit' | 'reset';
type InputType = 'text' | 'email' | 'password' | 'number' | 'tel';

type EventHandler = (event: Event) => void;
type ValidationRule = (value: string) => boolean | string;

type ComponentInfo = {
  type: ComponentType;
  theme: ThemeType;
  platform: Platform;
  variant: ComponentVariant;
  isRendered: boolean;
  elementId: string;
};

type ComponentFactory<T extends UIComponent> = {
  createComponent(type: ComponentType, props: ComponentProps): T;
  getSupportedTypes(): ComponentType[];
  getThemeInfo(): ThemeInfo;
};

type ThemeInfo = {
  name: string;
  version: string;
  platform: Platform;
  colorScheme: 'light' | 'dark' | 'auto';
};

// Enums for better type safety
enum ComponentState {
  CREATED = 'created',
  RENDERED = 'rendered',
  UPDATED = 'updated',
  DESTROYED = 'destroyed'
}

enum AnimationType {
  FADE = 'fade',
  SLIDE = 'slide',
  SCALE = 'scale',
  BOUNCE = 'bounce'
}

// Abstract base class for UI components
abstract class BaseUIComponent implements UIComponent {
  protected element: HTMLElement | null = null;
  protected state: ComponentState = ComponentState.CREATED;
  protected eventListeners: Map<string, EventHandler[]> = new Map();
  
  constructor(
    protected props: ComponentProps,
    protected theme: ThemeType,
    protected platform: Platform
  ) {}
  
  abstract render(): HTMLElement;
  
  public update(props: ComponentProps): void {
    this.props = { ...this.props, ...props };
    this.state = ComponentState.UPDATED;
    if (this.element) {
      this.rerender();
    }
  }
  
  public destroy(): void {
    if (this.element) {
      this.removeAllEventListeners();
      this.element.remove();
      this.element = null;
      this.state = ComponentState.DESTROYED;
    }
  }
  
  public addEventListener(event: string, handler: EventHandler): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(handler);
    
    if (this.element) {
      this.element.addEventListener(event, handler);
    }
  }
  
  public removeEventListener(event: string, handler: EventHandler): void {
    const handlers = this.eventListeners.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
        if (this.element) {
          this.element.removeEventListener(event, handler);
        }
      }
    }
  }
  
  public getComponentInfo(): ComponentInfo {
    return {
      type: this.getComponentType(),
      theme: this.theme,
      platform: this.platform,
      variant: this.props.variant || 'primary',
      isRendered: this.state === ComponentState.RENDERED,
      elementId: this.props.id || this.generateId()
    };
  }
  
  protected abstract getComponentType(): ComponentType;
  protected abstract rerender(): void;
  
  protected applyThemeStyles(element: HTMLElement): void {
    const themeClass = `${this.theme}-theme`;
    const platformClass = `${this.platform}-platform`;
    element.classList.add(themeClass, platformClass);
  }
  
  protected attachEventListeners(): void {
    if (this.element) {
      this.eventListeners.forEach((handlers, event) => {
        handlers.forEach(handler => {
          this.element!.addEventListener(event, handler);
        });
      });
    }
  }
  
  private removeAllEventListeners(): void {
    if (this.element) {
      this.eventListeners.forEach((handlers, event) => {
        handlers.forEach(handler => {
          this.element!.removeEventListener(event, handler);
        });
      });
    }
  }
  
  private generateId(): string {
    return `${this.getComponentType()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Material Design Button Implementation
class MaterialButton extends BaseUIComponent {
  private rippleEffect: HTMLElement | null = null;
  
  constructor(private buttonProps: ButtonProps, platform: Platform) {
    super(buttonProps, 'material', platform);
  }
  
  protected getComponentType(): ComponentType {
    return 'button';
  }
  
  public render(): HTMLElement {
    const button = document.createElement('button');
    button.className = `md-button md-button--${this.props.variant || 'primary'}`;
    button.textContent = this.buttonProps.text;
    
    if (this.props.id) button.id = this.props.id;
    if (this.props.disabled) button.disabled = this.props.disabled;
    if (this.buttonProps.loading) {
      button.classList.add('md-button--loading');
      button.disabled = true;
    }
    
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
  
  protected rerender(): void {
    if (this.element) {
      this.element.textContent = this.buttonProps.text;
      this.element.className = `md-button md-button--${this.props.variant || 'primary'}`;
      this.applyThemeStyles(this.element);
    }
  }
  
  private addRippleEffect(button: HTMLElement): void {
    if (this.platform === 'desktop') {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.className = 'md-ripple';
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = (e as MouseEvent).clientX - rect.left - size / 2;
        const y = (e as MouseEvent).clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    }
  }
}

// Fluent UI Button Implementation
class FluentButton extends BaseUIComponent {
  constructor(private buttonProps: ButtonProps, platform: Platform) {
    super(buttonProps, 'fluent', platform);
  }
  
  protected getComponentType(): ComponentType {
    return 'button';
  }
  
  public render(): HTMLElement {
    const button = document.createElement('button');
    button.className = `fluent-button fluent-button--${this.props.variant || 'primary'}`;
    button.textContent = this.buttonProps.text;
    
    if (this.props.id) button.id = this.props.id;
    if (this.props.disabled) button.disabled = this.props.disabled;
    
    // Add Fluent UI specific styling and behavior
    if (this.platform === 'mobile') {
      button.classList.add('fluent-button--touch');
    }
    
    this.applyThemeStyles(button);
    this.addFluentAnimations(button);
    
    if (this.buttonProps.onClick) {
      button.addEventListener('click', this.buttonProps.onClick);
    }
    
    this.element = button;
    this.state = ComponentState.RENDERED;
    this.attachEventListeners();
    
    return button;
  }
  
  protected rerender(): void {
    if (this.element) {
      this.element.textContent = this.buttonProps.text;
      this.element.className = `fluent-button fluent-button--${this.props.variant || 'primary'}`;
      this.applyThemeStyles(this.element);
    }
  }
  
  private addFluentAnimations(button: HTMLElement): void {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-1px)';
      button.style.transition = 'transform 0.2s ease';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });
  }
}

// Material Design Input Implementation
class MaterialInput extends BaseUIComponent {
  private labelElement: HTMLElement | null = null;
  
  constructor(private inputProps: InputProps, platform: Platform) {
    super(inputProps, 'material', platform);
  }
  
  protected getComponentType(): ComponentType {
    return 'input';
  }
  
  public render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'md-input-container';
    
    const input = document.createElement('input');
    input.type = this.inputProps.type || 'text';
    input.className = 'md-input';
    input.placeholder = this.inputProps.placeholder || '';
    input.value = this.inputProps.value || '';
    
    if (this.props.id) input.id = this.props.id;
    if (this.props.disabled) input.disabled = this.props.disabled;
    
    // Create floating label
    if (this.inputProps.placeholder) {
      this.labelElement = document.createElement('label');
      this.labelElement.className = 'md-input-label';
      this.labelElement.textContent = this.inputProps.placeholder;
      container.appendChild(this.labelElement);
    }
    
    container.appendChild(input);
    this.applyThemeStyles(container);
    this.addInputBehavior(input);
    
    this.element = container;
    this.state = ComponentState.RENDERED;
    this.attachEventListeners();
    
    return container;
  }
  
  protected rerender(): void {
    if (this.element) {
      const input = this.element.querySelector('input');
      if (input) {
        input.value = this.inputProps.value || '';
        input.placeholder = this.inputProps.placeholder || '';
      }
    }
  }
  
  private addInputBehavior(input: HTMLInputElement): void {
    input.addEventListener('focus', () => {
      if (this.labelElement) {
        this.labelElement.classList.add('md-input-label--active');
      }
      if (this.inputProps.onFocus) {
        this.inputProps.onFocus(new Event('focus'));
      }
    });
    
    input.addEventListener('blur', () => {
      if (this.labelElement && !input.value) {
        this.labelElement.classList.remove('md-input-label--active');
      }
      if (this.inputProps.onBlur) {
        this.inputProps.onBlur(new Event('blur'));
      }
    });
    
    if (this.inputProps.onChange) {
      input.addEventListener('input', this.inputProps.onChange);
    }
  }
}

// Component Factory Implementations
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

class FluentUIFactory implements ComponentFactory<UIComponent> {
  constructor(private platform: Platform) {}
  
  public createComponent(type: ComponentType, props: ComponentProps): UIComponent {
    switch (type) {
      case 'button':
        return new FluentButton(props as ButtonProps, this.platform);
      default:
        throw new Error(`Fluent UI factory does not support component type: ${type}`);
    }
  }
  
  public getSupportedTypes(): ComponentType[] {
    return ['button'];
  }
  
  public getThemeInfo(): ThemeInfo {
    return {
      name: 'Fluent UI',
      version: '9.0',
      platform: this.platform,
      colorScheme: 'light'
    };
  }
}

// Main UI Component Factory
class UIComponentFactory {
  private static factories = new Map<string, ComponentFactory<UIComponent>>();
  private static currentTheme: ThemeType = 'material';
  private static currentPlatform: Platform = 'desktop';
  
  public static initialize(theme: ThemeType, platform: Platform): void {
    this.currentTheme = theme;
    this.currentPlatform = platform;
    
    // Register default factories
    this.registerFactory('material', new MaterialDesignFactory(platform));
    this.registerFactory('fluent', new FluentUIFactory(platform));
  }
  
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
  
  public static setTheme(theme: ThemeType): void {
    this.currentTheme = theme;
  }
  
  public static setPlatform(platform: Platform): void {
    this.currentPlatform = platform;
    // Reinitialize factories with new platform
    this.initialize(this.currentTheme, platform);
  }
  
  public static getAvailableThemes(): ThemeType[] {
    return Array.from(this.factories.keys()) as ThemeType[];
  }
  
  public static getCurrentTheme(): ThemeType {
    return this.currentTheme;
  }
  
  public static getCurrentPlatform(): Platform {
    return this.currentPlatform;
  }
}

// Usage Examples
// Example 1: Basic Usage
const example1 = async () => {
  try {
    // Initialize factory with Material Design theme for desktop
    UIComponentFactory.initialize('material', 'desktop');
    
    // Create a Material Design button
    const button = UIComponentFactory.createComponent<MaterialButton>('button', {
      text: 'Click Me',
      variant: 'primary',
      size: 'medium',
      onClick: () => console.log('Button clicked!')
    } as ButtonProps);
    
    // Render the button
    const buttonElement = button.render();
    document.body.appendChild(buttonElement);
    
    console.log('Basic usage result:', button.getComponentInfo());
  } catch (error) {
    console.error('Error in basic usage:', error);
  }
};

// Example 2: Advanced Usage with Theme Switching
const example2 = async () => {
  try {
    // Initialize with Material Design
    UIComponentFactory.initialize('material', 'mobile');
    
    // Create components with different themes
    const materialButton = UIComponentFactory.createComponent<MaterialButton>('button', {
      text: 'Material Button',
      variant: 'primary'
    } as ButtonProps);
    
    const fluentButton = UIComponentFactory.createComponent<FluentButton>('button', {
      text: 'Fluent Button',
      variant: 'secondary'
    } as ButtonProps, 'fluent');
    
    // Create input component
    const materialInput = UIComponentFactory.createComponent<MaterialInput>('input', {
      placeholder: 'Enter your name',
      type: 'text',
      onChange: (e) => console.log('Input changed:', (e.target as HTMLInputElement).value)
    } as InputProps);
    
    // Render components
    const materialButtonEl = materialButton.render();
    const fluentButtonEl = fluentButton.render();
    const inputEl = materialInput.render();
    
    document.body.appendChild(materialButtonEl);
    document.body.appendChild(fluentButtonEl);
    document.body.appendChild(inputEl);
    
    console.log('Advanced usage results:', {
      materialButton: materialButton.getComponentInfo(),
      fluentButton: fluentButton.getComponentInfo(),
      input: materialInput.getComponentInfo()
    });
  } catch (error) {
    console.error('Error in advanced usage:', error);
  }
};

// Example 3: Edge Cases and Error Handling
const example3 = async () => {
  try {
    UIComponentFactory.initialize('material', 'desktop');
    
    // Test unsupported component type
    try {
      const modal = UIComponentFactory.createComponent('modal', {
        title: 'Test Modal',
        content: 'This should fail'
      } as ModalProps);
    } catch (error) {
      console.log('Expected error for unsupported component:', error.message);
    }
    
    // Test unsupported theme
    try {
      const button = UIComponentFactory.createComponent('button', {
        text: 'Test Button'
      } as ButtonProps, 'custom');
    } catch (error) {
      console.log('Expected error for unsupported theme:', error.message);
    }
    
    // Test component lifecycle
    const button = UIComponentFactory.createComponent<MaterialButton>('button', {
      text: 'Lifecycle Test',
      variant: 'danger'
    } as ButtonProps);
    
    const element = button.render();
    document.body.appendChild(element);
    
    // Update component
    button.update({ text: 'Updated Button', variant: 'success' } as ButtonProps);
    
    // Add event listener
    button.addEventListener('click', () => console.log('Button was clicked'));
    
    // Clean up
    setTimeout(() => {
      button.destroy();
      console.log('Component destroyed');
    }, 1000);
    
    console.log('Edge case handling completed successfully');
  } catch (error) {
    console.error('Error in edge case handling:', error);
  }
};

// Export for module usage
export {
  UIComponent,
  ComponentProps,
  ButtonProps,
  InputProps,
  ModalProps,
  ComponentType,
  ThemeType,
  Platform,
  ComponentFactory,
  BaseUIComponent,
  MaterialButton,
  FluentButton,
  MaterialInput,
  UIComponentFactory
};

// Run examples
if (require.main === module) {
  (async () => {
    await example1();
    await example2();
    await example3();
  })();
}
