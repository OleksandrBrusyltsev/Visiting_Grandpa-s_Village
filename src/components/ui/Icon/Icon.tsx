import s from './Icon.module.scss';

interface IconProps {
  name: string;
  className?: string;
}

const Icon = ({ name, className = '' }: IconProps) => {
  return (
    <svg
      className={`${s.icon} ${className}`}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
