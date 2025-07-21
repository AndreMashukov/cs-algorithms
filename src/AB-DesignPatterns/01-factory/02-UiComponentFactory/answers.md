# Factory Pattern - UI Component Factory Answers

## Q1: 2
The Factory Pattern encapsulates the component creation logic, allowing applications to create theme-specific and platform-optimized components without knowing implementation details. This enables dynamic theme switching (Material Design to Fluent UI) and platform adaptations (desktop to mobile) while maintaining consistent APIs for client code.

## Q2: 2
Separate factory instances enable theme-specific configuration and state management. Each factory can maintain theme-specific settings, optimization strategies, and platform adaptations. Storing them avoids repeated instantiation overhead and allows the `registerFactory` method to support runtime theme registration and switching.

## Q3: 2
The abstract `BaseUIComponent` provides common functionality like event listener management, lifecycle tracking, and state management while defining abstract methods for theme-specific rendering. This Template Method pattern ensures consistent behavior (like proper cleanup and event handling) across all themes while allowing each theme to implement its unique visual and interaction patterns.

## Q4: 3
The `createComponent` method checks `factory.getSupportedTypes()` to validate if the requested component type is supported by the current theme. If not supported, it throws an error with a clear message indicating which theme doesn't support the component type, preventing runtime failures and providing clear debugging information.

## Q5: 2
Touch interfaces have different interaction patterns compared to mouse-based desktop interfaces. Ripple effects are designed for mouse hover and click interactions, while mobile interfaces rely on different feedback mechanisms like haptic feedback and immediate visual state changes. Platform-specific implementations ensure appropriate user experience for each interaction model.

## Q6: 2
The generic constraint `<T extends UIComponent>` ensures that the factory methods return objects implementing the UIComponent interface, providing compile-time type safety and proper IntelliSense support. This prevents attempts to create invalid component types and ensures all returned components have required methods like `render()`, `update()`, and `destroy()`.

## Q7: 2
The `ComponentState` enum tracks component lifecycle stages (CREATED, RENDERED, UPDATED, DESTROYED) enabling proper state validation and cleanup operations. This prevents operations on destroyed components, ensures proper rendering order, and enables debugging by providing clear state information throughout the component lifecycle.

## Q8: 1
Platform-specific CSS classes enable optimizations for different interaction models. The `fluent-button--touch` class for mobile provides larger touch targets, different spacing, and touch-optimized interactions, while desktop versions can use hover effects and smaller click targets. This ensures optimal user experience across platforms.

## Q9: 2
The factory pattern enables runtime theme switching through the `registerFactory` method and theme parameter in `createComponent`. New theme factories can be registered dynamically, and components can be created with specific themes without modifying existing code. The factory registry manages theme-specific implementations transparently.

## Q10: 2
The `destroy()` method performs comprehensive cleanup by removing all event listeners (preventing memory leaks), removing the DOM element, setting the element reference to null, and updating the component state to DESTROYED. This ensures proper resource cleanup and prevents memory leaks in long-running applications.

## Q11: 2
Material Design's floating label pattern requires a separate label element to achieve the animation where the label moves from placeholder position to above the input when focused. This provides visual feedback and maintains accessibility while implementing the characteristic Material Design interaction pattern.

## Q12: 2
The `addEventListener` method stores event listeners in a Map (`this.eventListeners`) and attaches them when the component is rendered through the `attachEventListeners()` method. This allows event listeners to be registered before rendering while ensuring they're properly attached once the DOM element exists.

## Q13: 2
The Open/Closed Principle allows the system to be open for extension (new themes can be added by implementing ComponentFactory interface) while being closed for modification (existing factory code doesn't need changes). New themes are added through factory registration without touching core factory logic.

## Q14: 1
Different naming conventions (md-button vs fluent-button) prevent CSS conflicts between themes and maintain theme-specific styling consistency. This ensures that Material Design styles don't interfere with Fluent UI styles when multiple themes are used in the same application or when switching themes.

## Q15: 2
The `rerender()` method updates only the specific properties that have changed (like text content and CSS classes) while preserving the existing DOM structure and event listeners. This approach is more efficient than complete recreation and maintains component state and references.

## Q16: 2
Platform-specific initialization allows factories to configure behaviors optimized for each platform during creation. Desktop factories might enable hover effects and ripple animations, while mobile factories configure touch-friendly interactions and different sizing. This ensures optimal user experience from the moment components are created.

## Q17: 2
The `getSupportedTypes()` method enables runtime validation of component type support, allowing the main factory to check compatibility before attempting creation. This provides introspection capabilities for debugging and enables dynamic UI generation based on available component types for each theme.

## Q18: 2
The implementation maintains a Map of event listeners (`this.eventListeners`) and provides `removeAllEventListeners()` method that's called during component destruction. This ensures all registered listeners are properly removed when components are destroyed, preventing memory leaks in applications with dynamic component creation and destruction.

## Q19: 2
The `update()` method merges new props with existing ones using spread operator, updates the component state to UPDATED, and calls `rerender()` if the component is already rendered. This provides efficient updates while maintaining component state and allowing partial property updates.

## Q20: 2
Specific interfaces like `ButtonProps` and `InputProps` extending `ComponentProps` provide type safety for component-specific properties (like `text` for buttons, `placeholder` for inputs). This enables better IntelliSense, compile-time validation of component properties, and prevents invalid property assignments while maintaining a consistent base interface.
