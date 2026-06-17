/* @ds-bundle: {"format":3,"namespace":"BuyFromIranBFIDesignSystem_d94920","components":[{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"Tag","sourcePath":"components/data-display/Tag.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"}],"sourceHashes":{"components/data-display/Avatar.jsx":"4dc25f28feba","components/data-display/Badge.jsx":"e2634c404c3c","components/data-display/Card.jsx":"1f96a8a64d3e","components/data-display/Tag.jsx":"7520e9ebc6f5","components/forms/Button.jsx":"e7d155374e15","components/forms/Checkbox.jsx":"c74dc38060cb","components/forms/Input.jsx":"1e9e87149e52","components/forms/Select.jsx":"d1124742007c","components/forms/Switch.jsx":"7529c6d3155e","ui_kits/marketplace/Footer.jsx":"1807492a64d9","ui_kits/marketplace/Header.jsx":"9a560382aabc","ui_kits/marketplace/HomeScreen.jsx":"77d933c51186","ui_kits/marketplace/Icons.jsx":"1c49c2088547","ui_kits/marketplace/ListingScreen.jsx":"3992cf6cbb65","ui_kits/marketplace/SupplierCard.jsx":"d9bbed30c555","ui_kits/marketplace/SupplierScreen.jsx":"601177e63e0d","ui_kits/marketplace/data.js":"254db51580b0"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BuyFromIranBFIDesignSystem_d94920 = window.BuyFromIranBFIDesignSystem_d94920 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/data-display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BFI Avatar — supplier/company or person avatar with image or initials fallback.
 */
function Avatar({
  src,
  name = '',
  size = 40,
  square = false,
  style = {},
  ...rest
}) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join('');
  const radius = square ? 'var(--radius-md)' : 'var(--radius-circle)';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      flexShrink: 0,
      borderRadius: radius,
      overflow: 'hidden',
      background: 'var(--bfi-petroleum-100)',
      color: 'var(--bfi-petroleum-800)',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: Math.round(size * 0.4),
      letterSpacing: '0.02em',
      border: '1px solid var(--border-default)',
      userSelect: 'none',
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials || '?');
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BFI Badge — small status/label pill. Tones map to the BFI status palette.
 */
function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  icon = null,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      soft: ['var(--surface-section)', 'var(--text-body)'],
      solid: ['var(--bfi-petroleum-700)', '#fff']
    },
    primary: {
      soft: ['var(--bfi-petroleum-100)', 'var(--bfi-petroleum-800)'],
      solid: ['var(--color-primary)', '#fff']
    },
    success: {
      soft: ['var(--bfi-emerald-100)', 'var(--bfi-emerald-700)'],
      solid: ['var(--bfi-emerald-600)', '#fff']
    },
    gold: {
      soft: ['var(--bfi-gold-100)', 'var(--bfi-gold-700)'],
      solid: ['var(--bfi-gold-600)', 'var(--bfi-petroleum-900)']
    },
    warning: {
      soft: ['var(--bfi-warning-bg)', '#8a6d00'],
      solid: ['var(--bfi-warning)', 'var(--bfi-petroleum-900)']
    },
    error: {
      soft: ['var(--bfi-error-bg)', '#a82f2f'],
      solid: ['var(--bfi-error)', '#fff']
    },
    info: {
      soft: ['var(--bfi-info-bg)', '#1b5fc4'],
      solid: ['var(--bfi-info)', '#fff']
    }
  };
  const [bg, fg] = tones[tone][variant];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      padding: '3px 10px',
      background: bg,
      color: fg,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: '0.02em',
      lineHeight: 1.4,
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BFI Card — soft-cornered surface container with subtle elevation.
 */
function Card({
  children,
  padding = 'lg',
  interactive = false,
  elevation = 'sm',
  style = {},
  onClick,
  ...rest
}) {
  const pads = {
    none: 0,
    sm: 'var(--space-4)',
    md: 'var(--space-5)',
    lg: 'var(--space-6)'
  };
  const shadows = {
    none: 'none',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: shadows[elevation],
      padding: pads[padding],
      cursor: interactive ? 'pointer' : 'default',
      transition: 'box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard)',
      ...style
    },
    onMouseEnter: e => {
      if (!interactive) return;
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.borderColor = 'var(--bfi-petroleum-300)';
    },
    onMouseLeave: e => {
      if (!interactive) return;
      e.currentTarget.style.boxShadow = shadows[elevation];
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'var(--border-default)';
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BFI Tag — filter/category chip, optionally removable or selectable.
 */
function Tag({
  children,
  selected = false,
  onRemove,
  onClick,
  style = {},
  ...rest
}) {
  const clickable = Boolean(onClick);
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '7px',
      height: 30,
      padding: '0 12px',
      background: selected ? 'var(--bfi-petroleum-100)' : 'var(--surface-card)',
      color: selected ? 'var(--bfi-petroleum-800)' : 'var(--text-body)',
      border: `1.5px solid ${selected ? 'var(--color-primary)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      cursor: clickable ? 'pointer' : 'default',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      transition: 'background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)',
      ...style
    },
    onMouseEnter: e => {
      if (clickable && !selected) e.currentTarget.style.borderColor = 'var(--bfi-petroleum-300)';
    },
    onMouseLeave: e => {
      if (clickable && !selected) e.currentTarget.style.borderColor = 'var(--border-default)';
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    },
    "aria-label": "Remove",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 16,
      height: 16,
      padding: 0,
      border: 'none',
      borderRadius: '50%',
      background: 'transparent',
      color: 'currentColor',
      cursor: 'pointer',
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BFI Button — primary call-to-action and secondary actions.
 * Variants: primary (Petroleum Blue), secondary (outline), ghost, gold (premium).
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const heights = {
    sm: 'var(--control-h-sm)',
    md: 'var(--control-h-md)',
    lg: 'var(--control-h-lg)'
  };
  const pads = {
    sm: '0 16px',
    md: '0 22px',
    lg: '0 28px'
  };
  const fontSizes = {
    sm: 'var(--text-sm)',
    md: 'var(--text-base)',
    lg: 'var(--text-lg)'
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    height: heights[size],
    padding: pads[size],
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-body)',
    fontSize: fontSizes[size],
    fontWeight: 'var(--weight-semibold)',
    lineHeight: 1,
    letterSpacing: '0.01em',
    borderRadius: 'var(--radius-md)',
    border: '1.5px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard), color var(--duration-base) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)',
    whiteSpace: 'nowrap',
    userSelect: 'none'
  };
  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: 'var(--text-on-brand)',
      borderColor: 'var(--color-primary)'
    },
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--color-primary)',
      borderColor: 'var(--color-primary)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-primary)',
      borderColor: 'transparent'
    },
    gold: {
      background: 'var(--color-accent)',
      color: 'var(--bfi-petroleum-900)',
      borderColor: 'var(--color-accent)'
    }
  };
  const hoverFor = {
    primary: e => {
      e.currentTarget.style.background = 'var(--color-primary-hover)';
      e.currentTarget.style.borderColor = 'var(--color-primary-hover)';
    },
    secondary: e => {
      e.currentTarget.style.background = 'var(--surface-section)';
    },
    ghost: e => {
      e.currentTarget.style.background = 'var(--surface-section)';
    },
    gold: e => {
      e.currentTarget.style.background = 'var(--bfi-gold-700)';
      e.currentTarget.style.borderColor = 'var(--bfi-gold-700)';
      e.currentTarget.style.color = '#fff';
    }
  };
  const resetFor = e => {
    const v = variants[variant];
    e.currentTarget.style.background = v.background;
    e.currentTarget.style.borderColor = v.borderColor;
    e.currentTarget.style.color = v.color;
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    onMouseEnter: e => {
      if (!disabled) hoverFor[variant](e);
    },
    onMouseLeave: e => {
      if (!disabled) resetFor(e);
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(1px)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    },
    onFocus: e => {
      e.currentTarget.style.boxShadow = 'var(--focus-ring)';
    },
    onBlur: e => {
      e.currentTarget.style.boxShadow = 'none';
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BFI Checkbox — accessible checkbox with custom petroleum check.
 */
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const boxId = id || `bfi-cb-${Math.random().toString(36).slice(2, 8)}`;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: boxId,
    style: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.55 : 1,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)',
      userSelect: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: boxId,
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled,
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      flexShrink: 0,
      width: 20,
      height: 20,
      marginTop: 1,
      borderRadius: 'var(--radius-xs)',
      border: '1.5px solid var(--border-default)',
      background: 'var(--surface-card)',
      cursor: 'inherit',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '12px',
      transition: 'background-color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)'
    },
    onFocus: e => {
      e.currentTarget.style.boxShadow = 'var(--focus-ring)';
    },
    onBlur: e => {
      e.currentTarget.style.boxShadow = 'none';
    }
  }, rest)), label && /*#__PURE__*/React.createElement("span", {
    style: {
      lineHeight: 'var(--leading-snug)'
    }
  }, label), /*#__PURE__*/React.createElement("style", null, `
        #${boxId}:checked {
          background-color: var(--color-primary); border-color: var(--color-primary);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
        }
      `));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * BFI text Input with label, helper/error text, and optional leading icon.
 */
function Input({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  defaultValue,
  onChange,
  helperText = '',
  error = '',
  iconLeft = null,
  disabled = false,
  required = false,
  size = 'md',
  style = {},
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const inputId = id || `bfi-input-${Math.random().toString(36).slice(2, 8)}`;
  const heights = {
    sm: 'var(--control-h-sm)',
    md: 'var(--control-h-md)',
    lg: 'var(--control-h-lg)'
  };
  const invalid = Boolean(error);
  const borderColor = invalid ? 'var(--bfi-error)' : focused ? 'var(--color-primary)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: '100%',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-strong)',
      fontFamily: 'var(--font-body)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--bfi-error)',
      marginLeft: 2
    }
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      height: heights[size],
      padding: '0 14px',
      background: disabled ? 'var(--surface-subtle)' : 'var(--surface-card)',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focused && !invalid ? 'var(--focus-ring)' : 'none',
      transition: 'border-color var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color: 'var(--text-muted)',
      flexShrink: 0
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    required: required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-strong)'
    }
  }, rest))), (helperText || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: invalid ? 'var(--bfi-error)' : 'var(--text-muted)'
    }
  }, error || helperText));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * BFI Select — native dropdown styled to match BFI inputs, with a custom chevron.
 */
function Select({
  label,
  id,
  value,
  defaultValue,
  onChange,
  options = [],
  placeholder = 'Select…',
  helperText = '',
  error = '',
  disabled = false,
  required = false,
  size = 'md',
  style = {},
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const selectId = id || `bfi-select-${Math.random().toString(36).slice(2, 8)}`;
  const heights = {
    sm: 'var(--control-h-sm)',
    md: 'var(--control-h-md)',
    lg: 'var(--control-h-lg)'
  };
  const invalid = Boolean(error);
  const borderColor = invalid ? 'var(--bfi-error)' : focused ? 'var(--color-primary)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: '100%',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selectId,
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-strong)',
      fontFamily: 'var(--font-body)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--bfi-error)',
      marginLeft: 2
    }
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selectId,
    value: value,
    defaultValue: defaultValue ?? (value === undefined ? '' : undefined),
    onChange: onChange,
    disabled: disabled,
    required: required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: heights[size],
      padding: '0 40px 0 14px',
      background: disabled ? 'var(--surface-subtle)' : 'var(--surface-card)',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focused && !invalid ? 'var(--focus-ring)' : 'none',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-strong)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'border-color var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)'
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(opt => {
    const o = typeof opt === 'string' ? {
      value: opt,
      label: opt
    } : opt;
    return /*#__PURE__*/React.createElement("option", {
      key: o.value,
      value: o.value
    }, o.label);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--text-muted)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })))), (helperText || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: invalid ? 'var(--bfi-error)' : 'var(--text-muted)'
    }
  }, error || helperText));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BFI Switch — toggle for binary settings.
 */
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const swId = id || `bfi-sw-${Math.random().toString(36).slice(2, 8)}`;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: swId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.55 : 1,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)',
      userSelect: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: swId,
    type: "checkbox",
    role: "switch",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled,
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      margin: 0,
      width: 44,
      height: 26,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--bfi-border)',
      cursor: 'inherit',
      transition: 'background var(--duration-base) var(--ease-standard)'
    },
    onFocus: e => {
      e.currentTarget.style.boxShadow = 'var(--focus-ring)';
    },
    onBlur: e => {
      e.currentTarget.style.boxShadow = 'none';
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 3,
      left: 3,
      width: 20,
      height: 20,
      borderRadius: 'var(--radius-circle)',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      pointerEvents: 'none',
      transition: 'transform var(--duration-base) var(--ease-out)'
    },
    className: "bfi-sw-thumb"
  }), /*#__PURE__*/React.createElement("style", null, `
          #${swId}:checked { background: var(--color-secondary) !important; }
          #${swId}:checked ~ .bfi-sw-thumb { transform: translateX(18px); }
        `)), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/Footer.jsx
try { (() => {
function Footer() {
  const {
    Icon
  } = window;
  const cols = [{
    h: 'Marketplace',
    links: ['Browse suppliers', 'Product categories', 'Verified manufacturers', 'Request a quote']
  }, {
    h: 'For Buyers',
    links: ['How BFI works', 'Buyer protection', 'Logistics & shipping', 'Inspection services']
  }, {
    h: 'Company',
    links: ['About BuyFromIran', 'Our story', 'Careers', 'Contact us']
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--bfi-petroleum-900)',
      color: '#cdd9e2'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '56px 24px 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-full-white.svg",
    alt: "BuyFromIran",
    style: {
      height: 42,
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.6,
      maxWidth: 280,
      color: '#aebecb'
    }
  }, "The trusted wholesale hub connecting global buyers with reliable manufacturers and suppliers across Iran."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 18,
      color: '#aebecb'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 18,
    color: "#aebecb"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 18,
    color: "#aebecb"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 18,
    color: "#aebecb"
  }))), cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      color: '#fff',
      fontSize: 14,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      marginBottom: 14
    }
  }, c.h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, c.links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: '#aebecb',
      fontSize: 14,
      textDecoration: 'none'
    }
  }, l))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,0.1)',
      marginTop: 40,
      paddingTop: 20,
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 13,
      color: '#8fa3b3'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 BuyFromIran (BFI). All rights reserved."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: '#8fa3b3'
    }
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: '#8fa3b3'
    }
  }, "Terms"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: '#8fa3b3'
    }
  }, "Cookies")))));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/Header.jsx
try { (() => {
const {
  useState: useStateHdr
} = React;
function Header({
  onNav,
  active
}) {
  const {
    Button
  } = window.BuyFromIranBFIDesignSystem_d94920;
  const {
    Icon
  } = window;
  const [q, setQ] = useStateHdr('');
  const navItems = [{
    id: 'home',
    label: 'Home'
  }, {
    id: 'listing',
    label: 'Suppliers'
  }, {
    id: 'categories',
    label: 'Categories'
  }, {
    id: 'about',
    label: 'How it works'
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'saturate(180%) blur(12px)',
      borderBottom: '1px solid var(--divider)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bfi-petroleum-700)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '6px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      opacity: .9
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 14,
    color: "#fff"
  }), " Sourcing direct from Iran since 2020"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 18,
      opacity: .9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 14,
    color: "#fff"
  }), " +98 21 0000 0000"), /*#__PURE__*/React.createElement("span", null, "EN \xB7 USD")))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '14px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav('home');
    },
    style: {
      display: 'flex',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-full.svg",
    alt: "BuyFromIran",
    style: {
      height: 40
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 44,
      padding: '0 8px 0 16px',
      background: 'var(--surface-subtle)',
      border: '1.5px solid var(--border-default)',
      borderRadius: 'var(--radius-pill)',
      maxWidth: 460
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 18,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search products, suppliers, materials\u2026",
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: 'var(--text-strong)'
    },
    onKeyDown: e => {
      if (e.key === 'Enter') onNav('listing');
    }
  }), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "primary",
    style: {
      borderRadius: 'var(--radius-pill)'
    },
    onClick: () => onNav('listing')
  }, "Search")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      marginLeft: 'auto'
    }
  }, navItems.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.id,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav(n.id === 'categories' || n.id === 'about' ? 'home' : n.id);
    },
    style: {
      padding: '8px 12px',
      fontSize: 15,
      fontWeight: 500,
      borderRadius: 'var(--radius-md)',
      color: active === n.id ? 'var(--color-primary)' : 'var(--text-body)',
      textDecoration: 'none'
    }
  }, n.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => onNav('home')
  }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => onNav('home')
  }, "Join as Buyer"))));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/HomeScreen.jsx
try { (() => {
function HomeScreen({
  onNav,
  onOpenSupplier
}) {
  const {
    Button,
    Badge,
    Card
  } = window.BuyFromIranBFIDesignSystem_d94920;
  const {
    Icon,
    SupplierCard
  } = window;
  const {
    categories,
    suppliers
  } = window.BFI_DATA;
  const stats = [{
    n: '9,000+',
    l: 'Verified suppliers'
  }, {
    n: '120+',
    l: 'Buyer countries'
  }, {
    n: '50,000+',
    l: 'Products listed'
  }, {
    n: '20 yrs',
    l: 'Trade expertise'
  }];
  const steps = [{
    icon: 'search',
    h: 'Discover',
    t: 'Search thousands of vetted Iranian manufacturers by product, grade or region.'
  }, {
    icon: 'messageSquare',
    h: 'Connect',
    t: 'Message suppliers directly and request quotes with your specs and quantities.'
  }, {
    icon: 'shieldCheck',
    h: 'Verify',
    t: 'Review certificates, factory audits and ratings before you commit.'
  }, {
    icon: 'truck',
    h: 'Ship',
    t: 'Coordinate inspection, payment terms and logistics to your port of choice.'
  }];
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'linear-gradient(160deg, #0A2535 0%, #123C56 60%, #1C5273 100%)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.07,
      backgroundImage: 'radial-gradient(circle at 24px 24px, #fff 1.5px, transparent 0)',
      backgroundSize: '34px 34px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '72px 24px 80px',
      display: 'grid',
      gridTemplateColumns: '1.15fr 0.85fr',
      gap: 48,
      alignItems: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 14px',
      background: 'rgba(255,255,255,0.1)',
      border: '1px solid rgba(255,255,255,0.18)',
      borderRadius: 'var(--radius-pill)',
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: '0.03em',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "badgeCheck",
    size: 15,
    color: "#7FBA98"
  }), " Trusted by buyers in 120+ countries"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 56,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      color: '#fff',
      margin: '0 0 20px'
    }
  }, "Source quality", /*#__PURE__*/React.createElement("br", null), "materials, ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: '#E8C75A'
    }
  }, "direct"), " from Iran"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.55,
      color: '#cdd9e2',
      maxWidth: 480,
      margin: '0 0 30px'
    }
  }, "BuyFromIran connects you with vetted manufacturers and wholesalers \u2014 for construction materials, petrochemicals, minerals and more."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 18,
      color: "#0A2535"
    }),
    onClick: () => onNav('listing')
  }, "Browse suppliers"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    style: {
      background: 'transparent',
      color: '#fff',
      borderColor: 'rgba(255,255,255,0.4)'
    },
    onClick: () => onNav('home')
  }, "How it works"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.14)',
      borderRadius: 'var(--radius-xl)',
      padding: 28,
      backdropFilter: 'blur(6px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#7FBA98',
      marginBottom: 18
    }
  }, "Live on the marketplace"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 22
    }
  }, stats.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 32,
      fontWeight: 700,
      color: '#fff'
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: '#aebecb'
    }
  }, s.l))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-section)',
      borderBottom: '1px solid var(--divider)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '18px 24px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 28,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, [['shieldCheck', 'Verified manufacturers'], ['fileText', 'Mill & lab certificates'], ['award', 'Quality inspection'], ['truck', 'Port-to-port logistics']].map(([ic, t]) => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      fontSize: 14.5,
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 18,
    color: "var(--color-primary)"
  }), " ", t)))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '72px 24px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bfi-eyebrow"
  }, "Explore the marketplace"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 36,
      margin: '8px 0 0'
    }
  }, "Browse by category")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 18
    }
  }, categories.map(c => /*#__PURE__*/React.createElement(Card, {
    key: c.id,
    interactive: true,
    onClick: () => onNav('listing'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 52,
      height: 52,
      borderRadius: 'var(--radius-md)',
      background: 'var(--bfi-petroleum-050)',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 24,
    color: "var(--color-primary)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: 'var(--text-strong)',
      fontSize: 16
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--text-muted)'
    }
  }, c.blurb)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--color-secondary)'
    }
  }, c.count))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '56px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "bfi-eyebrow"
  }, "Hand-picked"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 34,
      margin: '8px 0 0'
    }
  }, "Featured suppliers")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 17,
      color: "var(--color-primary)"
    }),
    onClick: () => onNav('listing')
  }, "View all")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20
    }
  }, suppliers.slice(0, 3).map(s => /*#__PURE__*/React.createElement(SupplierCard, {
    key: s.id,
    s: s,
    onOpen: onOpenSupplier
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-subtle)',
      borderTop: '1px solid var(--divider)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '72px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bfi-eyebrow"
  }, "Simple & transparent"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 36,
      margin: '8px 0 0'
    }
  }, "How BuyFromIran works")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 20
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.h,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 56,
      height: 56,
      borderRadius: 'var(--radius-circle)',
      background: 'var(--surface-card)',
      border: '1.5px solid var(--border-default)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 24,
    color: "var(--color-primary)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--color-accent)',
      letterSpacing: '0.08em'
    }
  }, "STEP ", i + 1), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 19,
      margin: '4px 0 6px'
    }
  }, s.h), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-body)',
      lineHeight: 1.55,
      margin: 0
    }
  }, s.t)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '64px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(135deg, #123C56, #0A2535)',
      borderRadius: 'var(--radius-xl)',
      padding: '52px 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 32,
      flexWrap: 'wrap',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: -40,
      top: -40,
      width: 240,
      height: 240,
      borderRadius: '50%',
      background: 'rgba(201,162,39,0.12)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: '#fff',
      fontSize: 32,
      margin: '0 0 8px'
    }
  }, "Ready to source from Iran?"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: '#cdd9e2',
      fontSize: 17,
      margin: 0,
      maxWidth: 460
    }
  }, "Create a free buyer account and start connecting with verified suppliers today.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "lg",
    onClick: () => onNav('home')
  }, "Join as Buyer"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    style: {
      background: 'transparent',
      color: '#fff',
      borderColor: 'rgba(255,255,255,0.4)'
    },
    onClick: () => onNav('listing')
  }, "Browse first")))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/Icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BFI icon set — Lucide (ISC licensed) 24×24 stroke icons.
 * Stroke-based, 2px weight, round caps/joins — matches BFI's clean, corporate tone.
 */
const PATHS = {
  search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })),
  mapPin: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })),
  shieldCheck: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1 1 0 0 1 1.3 0C14.6 3.8 17 5 19 5a1 1 0 0 1 1 1Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9 12 2 2 4-4"
  })),
  badgeCheck: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9 12 2 2 4-4"
  })),
  building: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    width: "16",
    height: "20",
    x: "4",
    y: "2",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 22v-4h6v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"
  })),
  truck: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 18H9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "18",
    r: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "18",
    r: "2"
  })),
  globe: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 12h20"
  })),
  star: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M11.5 2.8a.5.5 0 0 1 .9 0l2.4 5 5.4.8a.5.5 0 0 1 .3.85l-3.9 3.8.9 5.4a.5.5 0 0 1-.72.53L12 17.3l-4.8 2.5a.5.5 0 0 1-.73-.52l.92-5.4-3.9-3.8a.5.5 0 0 1 .27-.85l5.4-.8Z"
  })),
  arrowRight: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12 5 7 7-7 7"
  })),
  chevronDown: /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }),
  chevronRight: /*#__PURE__*/React.createElement("path", {
    d: "m9 18 6-6-6-6"
  }),
  menu: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "4",
    x2: "20",
    y1: "6",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    x2: "20",
    y1: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    x2: "20",
    y1: "18",
    y2: "18"
  })),
  x: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m6 6 12 12"
  })),
  mail: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "16",
    x: "2",
    y: "4",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
  })),
  phone: /*#__PURE__*/React.createElement("path", {
    d: "M13.83 19.05A16 16 0 0 1 4.95 10.17 2 2 0 0 1 6.9 7.5l1.27.13a2 2 0 0 1 1.7 1.45l.34 1.36a2 2 0 0 1-.5 1.9l-.7.7a12 12 0 0 0 4 4l.7-.7a2 2 0 0 1 1.9-.5l1.36.34a2 2 0 0 1 1.45 1.7l.13 1.27a2 2 0 0 1-2.67 1.95Z"
  }),
  package: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.3 7 12 12l8.7-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 22V12"
  })),
  award: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "6"
  })),
  filter: /*#__PURE__*/React.createElement("path", {
    d: "M3 4.6A.6.6 0 0 1 3.6 4h16.8a.6.6 0 0 1 .47.97L14 13v6a1 1 0 0 1-.5.87l-3 1.73A.5.5 0 0 1 10 21V13L3.13 5.57A.6.6 0 0 1 3 5.2Z"
  }),
  messageSquare: /*#__PURE__*/React.createElement("path", {
    d: "M22 17a2 2 0 0 1-2 2H6.6a1 1 0 0 0-.7.3l-2.2 2.2A.5.5 0 0 1 3 21.2V5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2Z"
  }),
  fileText: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 2v4a2 2 0 0 0 2 2h4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 9H8M16 13H8M16 17H8"
  })),
  factory: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 16h.01M16 16h.01M8 16h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 22V8.5a.5.5 0 0 1 .77-.42l5.46 3.65a.5.5 0 0 0 .77-.42V8.5a.5.5 0 0 1 .77-.42l5.46 3.65a.5.5 0 0 0 .77-.42V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v17Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 22h20"
  })),
  user: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 21a8 8 0 0 0-16 0"
  })),
  heart: /*#__PURE__*/React.createElement("path", {
    d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-2.836.039L5 15c-1.5-1.5-3-3.2-3-5.5"
  }),
  clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 6v6l4 2"
  }))
};
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'block',
      flexShrink: 0,
      ...style
    },
    "aria-hidden": "true"
  }, rest), PATHS[name] || null);
}
window.Icon = Icon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/ListingScreen.jsx
try { (() => {
const {
  useState: useStateList
} = React;
function ListingScreen({
  onOpenSupplier
}) {
  const {
    Button,
    Checkbox,
    Tag,
    Select,
    Badge
  } = window.BuyFromIranBFIDesignSystem_d94920;
  const {
    Icon,
    SupplierCard
  } = window;
  const {
    suppliers,
    categories
  } = window.BFI_DATA;
  const [verifiedOnly, setVerifiedOnly] = useStateList(false);
  const [activeCats, setActiveCats] = useStateList([]);
  const toggleCat = name => setActiveCats(p => p.includes(name) ? p.filter(c => c !== name) : [...p, name]);
  let list = suppliers.filter(s => (!verifiedOnly || s.verified) && (activeCats.length === 0 || activeCats.includes(s.cat)));
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: 'var(--surface-subtle)',
      minHeight: '70vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--divider)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '28px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      marginBottom: 6
    }
  }, "Home \xB7 Suppliers"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 32,
      margin: 0
    }
  }, "Wholesale suppliers from Iran"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      color: 'var(--text-body)'
    }
  }, suppliers.length, "+ verified manufacturers ready to quote."))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '28px 24px',
      display: 'grid',
      gridTemplateColumns: '264px 1fr',
      gap: 28,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 96,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "filter",
    size: 18,
    color: "var(--color-primary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Filters")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-strong)',
      marginBottom: 12
    }
  }, "Category"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, categories.map(c => /*#__PURE__*/React.createElement(Checkbox, {
    key: c.id,
    label: c.name,
    checked: activeCats.includes(c.name),
    onChange: () => toggleCat(c.name)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--divider)',
      paddingTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-strong)',
      marginBottom: 12
    }
  }, "Trust"), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Verified suppliers only",
    checked: verifiedOnly,
    onChange: e => setVerifiedOnly(e.target.checked)
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => {
      setVerifiedOnly(false);
      setActiveCats([]);
    }
  }, "Clear all")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 18,
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, activeCats.map(c => /*#__PURE__*/React.createElement(Tag, {
    key: c,
    onRemove: () => toggleCat(c)
  }, c)), verifiedOnly && /*#__PURE__*/React.createElement(Tag, {
    onRemove: () => setVerifiedOnly(false)
  }, "Verified only"), activeCats.length === 0 && !verifiedOnly && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, list.length, " suppliers")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 200
    }
  }, /*#__PURE__*/React.createElement(Select, {
    options: ['Best match', 'Top rated', 'Most reviews', 'Years in business'],
    defaultValue: "Best match"
  }))), list.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 60,
      textAlign: 'center',
      color: 'var(--text-muted)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-default)'
    }
  }, "No suppliers match these filters.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 20
    }
  }, list.map(s => /*#__PURE__*/React.createElement(SupplierCard, {
    key: s.id,
    s: s,
    onOpen: onOpenSupplier
  }))))));
}
window.ListingScreen = ListingScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/ListingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/SupplierCard.jsx
try { (() => {
function SupplierCard({
  s,
  onOpen
}) {
  const {
    Card,
    Badge,
    Avatar,
    Button
  } = window.BuyFromIranBFIDesignSystem_d94920;
  const {
    Icon
  } = window;
  return /*#__PURE__*/React.createElement(Card, {
    interactive: true,
    padding: "none",
    elevation: "sm",
    onClick: () => onOpen(s),
    style: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 132,
      position: 'relative',
      background: `linear-gradient(135deg, ${s.tone} 0%, ${s.tone}cc 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.16,
      backgroundImage: 'radial-gradient(circle at 18px 18px, #fff 1.5px, transparent 0)',
      backgroundSize: '22px 22px'
    }
  }), /*#__PURE__*/React.createElement(Icon, {
    name: {
      'Construction Materials': 'building',
      'Petrochemicals': 'factory',
      'Agriculture & Food': 'globe',
      'Minerals & Metals': 'award'
    }[s.cat] || 'package',
    size: 44,
    color: "rgba(255,255,255,0.9)",
    strokeWidth: 1.5
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      display: 'flex',
      gap: 6
    }
  }, s.premium && /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    variant: "solid"
  }, "Premium")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      right: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255,255,255,0.9)',
      borderRadius: '50%'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 16,
    color: "var(--text-muted)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 18px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: s.name,
    square: true,
    size: 36,
    style: {
      background: '#fff',
      color: s.tone,
      border: `1.5px solid ${s.tone}33`,
      fontFamily: 'var(--font-display)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--text-strong)',
      fontSize: 15.5,
      fontFamily: 'var(--font-display)'
    }
  }, s.name), s.verified && /*#__PURE__*/React.createElement(Icon, {
    name: "badgeCheck",
    size: 16,
    color: "var(--color-secondary)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mapPin",
    size: 13,
    color: "var(--text-muted)"
  }), " ", s.city, " \xB7 ", s.years, " yrs"))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13.5,
      color: 'var(--text-body)',
      lineHeight: 1.5,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, s.blurb), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 15,
    color: "var(--color-accent)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--text-strong)',
      fontSize: 13.5
    }
  }, s.rating.toFixed(1)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "(", s.reviews, ")"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, "MOQ ", s.moq)), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    fullWidth: true,
    onClick: e => {
      e.stopPropagation();
      onOpen(s);
    }
  }, "View supplier")));
}
window.SupplierCard = SupplierCard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/SupplierCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/SupplierScreen.jsx
try { (() => {
const {
  useState: useStateSup
} = React;
function SupplierScreen({
  s,
  onBack
}) {
  const {
    Button,
    Badge,
    Card,
    Avatar,
    Input,
    Select
  } = window.BuyFromIranBFIDesignSystem_d94920;
  const {
    Icon
  } = window;
  const [tab, setTab] = useStateSup('products');
  const tabs = [['products', 'Products'], ['about', 'About'], ['certs', 'Certifications']];
  const certs = ['ISO 9001:2015', 'ISO 14001', 'CE Marking', 'Mill Test Certificate', 'SGS Inspection'];
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: 'var(--surface-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 180,
      background: `linear-gradient(135deg, ${s.tone} 0%, ${s.tone}bb 100%)`,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.14,
      backgroundImage: 'radial-gradient(circle at 22px 22px, #fff 1.6px, transparent 0)',
      backgroundSize: '30px 30px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      position: 'absolute',
      top: 18,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      padding: '7px 14px',
      background: 'rgba(255,255,255,0.9)',
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 15,
    style: {
      transform: 'rotate(180deg)'
    }
  }), " Back to suppliers"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '0 24px 64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 20,
      marginTop: -32,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: s.name,
    square: true,
    size: 92,
    style: {
      background: '#fff',
      color: s.tone,
      border: '4px solid #fff',
      boxShadow: 'var(--shadow-md)',
      fontFamily: 'var(--font-display)',
      fontSize: 34,
      borderRadius: 'var(--radius-lg)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      paddingBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 30,
      margin: 0
    }
  }, s.name), s.verified && /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "badgeCheck",
      size: 13,
      color: "var(--bfi-emerald-700)"
    })
  }, "Verified"), s.premium && /*#__PURE__*/React.createElement(Badge, {
    tone: "gold"
  }, "Premium")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      marginTop: 8,
      color: 'var(--text-body)',
      fontSize: 14.5,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mapPin",
    size: 15,
    color: "var(--text-muted)"
  }), " ", s.city, ", Iran"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "building",
    size: 15,
    color: "var(--text-muted)"
  }), " ", s.cat), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 15,
    color: "var(--text-muted)"
  }), " ", s.years, " years in business"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 15,
    color: "var(--color-accent)"
  }), " ", s.rating.toFixed(1), " (", s.reviews, " reviews)")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 340px',
      gap: 28,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid var(--divider)',
      marginBottom: 24
    }
  }, tabs.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => setTab(id),
    style: {
      padding: '12px 18px',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      color: tab === id ? 'var(--color-primary)' : 'var(--text-muted)',
      borderBottom: `2.5px solid ${tab === id ? 'var(--color-primary)' : 'transparent'}`,
      marginBottom: -1
    }
  }, label))), tab === 'products' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, s.products.map((p, i) => /*#__PURE__*/React.createElement(Card, {
    key: p,
    padding: "md",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 'var(--radius-md)',
      background: 'var(--bfi-petroleum-050)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "package",
    size: 26,
    color: "var(--color-primary)",
    strokeWidth: 1.5
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: 'var(--text-strong)',
      fontSize: 16
    }
  }, p), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, "MOQ ", s.moq, " \xB7 FOB ", s.city, " \xB7 Export packed")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "Request quote")))), tab === 'about' && /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 0
    }
  }, "Company overview"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-body)',
      lineHeight: 1.65
    }
  }, s.blurb), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-body)',
      lineHeight: 1.65,
      marginBottom: 0
    }
  }, "Established ", 2026 - s.years, ", ", s.name, " exports to buyers across the Gulf, Central Asia and Europe, with dedicated export documentation and multilingual trade support through BuyFromIran.")), tab === 'certs' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, certs.map(c => /*#__PURE__*/React.createElement(Card, {
    key: c,
    padding: "md",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shieldCheck",
    size: 22,
    color: "var(--color-secondary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, c))))), /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    elevation: "md",
    style: {
      position: 'sticky',
      top: 96
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 0,
      fontSize: 19
    }
  }, "Request a quote"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      color: 'var(--text-muted)',
      marginTop: -8
    }
  }, "Typically replies within 24 hours."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Product",
    options: s.products,
    placeholder: "Select a product"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Quantity",
    placeholder: `e.g. 100 (MOQ ${s.moq})`
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Destination port",
    placeholder: "e.g. Jebel Ali, UAE"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 17,
      color: "#fff"
    })
  }, "Send request"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "messageSquare",
      size: 17,
      color: "var(--color-primary)"
    })
  }, "Message supplier")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--divider)',
      marginTop: 18,
      paddingTop: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      fontSize: 13.5,
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shieldCheck",
    size: 16,
    color: "var(--color-secondary)"
  }), " Buyer protection eligible"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fileText",
    size: 16,
    color: "var(--text-muted)"
  }), " Documents verified by BFI"))))));
}
window.SupplierScreen = SupplierScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/SupplierScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/data.js
try { (() => {
// BFI marketplace — mock data for the UI kit (illustrative only)
window.BFI_DATA = {
  categories: [{
    id: 'construction',
    name: 'Construction Materials',
    icon: 'building',
    count: '2,400+',
    blurb: 'Cement, steel, tiles, stone'
  }, {
    id: 'petrochem',
    name: 'Petrochemicals',
    icon: 'factory',
    count: '1,180+',
    blurb: 'Bitumen, polymers, solvents'
  }, {
    id: 'industrial',
    name: 'Industrial Products',
    icon: 'package',
    count: '3,050+',
    blurb: 'Machinery, tools, parts'
  }, {
    id: 'agriculture',
    name: 'Agriculture & Food',
    icon: 'globe',
    count: '1,640+',
    blurb: 'Saffron, dried fruit, dates'
  }, {
    id: 'minerals',
    name: 'Minerals & Metals',
    icon: 'award',
    count: '920+',
    blurb: 'Copper, zinc, gypsum'
  }, {
    id: 'textiles',
    name: 'Textiles & Carpets',
    icon: 'fileText',
    count: '780+',
    blurb: 'Yarn, rugs, fabric'
  }],
  suppliers: [{
    id: 'pars-cement',
    name: 'Pars Cement Co.',
    cat: 'Construction Materials',
    city: 'Tehran',
    years: 18,
    verified: true,
    premium: true,
    rating: 4.9,
    reviews: 212,
    moq: '25 MT',
    initials: 'PC',
    tone: '#123C56',
    products: ['Portland Cement Type II', 'White Cement', 'Sulphate-Resistant Cement'],
    blurb: 'ISO-certified manufacturer producing 1.2M tonnes of cement annually for export across the Gulf and Central Asia.'
  }, {
    id: 'azar-steel',
    name: 'Azar Steel Rolling',
    cat: 'Construction Materials',
    city: 'Tabriz',
    years: 22,
    verified: true,
    premium: false,
    rating: 4.7,
    reviews: 168,
    moq: '10 MT',
    initials: 'AS',
    tone: '#246E45',
    products: ['Rebar A3', 'I-Beams', 'Steel Coils'],
    blurb: 'Hot-rolled rebar and structural steel with on-time bulk shipping and full mill test certificates.'
  }, {
    id: 'caspian-bitumen',
    name: 'Caspian Bitumen',
    cat: 'Petrochemicals',
    city: 'Bandar Abbas',
    years: 14,
    verified: true,
    premium: true,
    rating: 4.8,
    reviews: 134,
    moq: '20 MT',
    initials: 'CB',
    tone: '#9A7B1D',
    products: ['Bitumen 60/70', 'Bitumen 85/100', 'Bulk Bitumen Drums'],
    blurb: 'Penetration-grade bitumen in drums, bulk and bitubags with port-side loading at Bandar Abbas.'
  }, {
    id: 'persis-saffron',
    name: 'Persis Saffron Trading',
    cat: 'Agriculture & Food',
    city: 'Mashhad',
    years: 9,
    verified: true,
    premium: true,
    rating: 5.0,
    reviews: 301,
    moq: '5 kg',
    initials: 'PS',
    tone: '#C9A227',
    products: ['Negin Saffron', 'Sargol Saffron', 'Saffron Powder'],
    blurb: 'Premium grade Negin and Sargol saffron, lab-tested for ISO 3632 colouring strength, export-packed.'
  }, {
    id: 'kavir-copper',
    name: 'Kavir Copper Industries',
    cat: 'Minerals & Metals',
    city: 'Kerman',
    years: 16,
    verified: true,
    premium: false,
    rating: 4.6,
    reviews: 97,
    moq: '8 MT',
    initials: 'KC',
    tone: '#123C56',
    products: ['Copper Cathode', 'Copper Wire Rod', 'Copper Concentrate'],
    blurb: 'LME grade-A copper cathodes and wire rod direct from one of Iran\u2019s largest copper belts.'
  }, {
    id: 'yazd-tiles',
    name: 'Yazd Ceramic & Tile',
    cat: 'Construction Materials',
    city: 'Yazd',
    years: 12,
    verified: false,
    premium: false,
    rating: 4.5,
    reviews: 76,
    moq: '500 m\u00B2',
    initials: 'YT',
    tone: '#1C5273',
    products: ['Porcelain Tiles', 'Glazed Wall Tiles', 'Floor Ceramics'],
    blurb: 'Porcelain and glazed ceramics in 60+ designs with container-load export pricing.'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

})();
