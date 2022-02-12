export const notificationDot = (
  top: number,
  right: number,
  visible = false
) => `
position: relative;

::before {
  transition: var(--trans-default);
  opacity: ${visible ? 1 : 0};
  content: '';
  position: absolute;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background-color: var(--color-red);
  top: ${top}px;
  right: ${right}px;
}`;
