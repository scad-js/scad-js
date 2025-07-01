import { describe, it, expect } from 'vitest';
import * as S from '../src';

describe('Modifiers', () => {
  it('should add disable modifier to existing object', () => {
    expect((S.square() as any).disable()).toEqual({
      type: '*union',
      children: [S.square()],
    });
  });

  it('should add root modifier to existing object', () => {
    expect((S.square() as any).root()).toEqual({
      type: '!union',
      children: [S.square()],
    });
  });

  it('should add debug modifier to existing object', () => {
    expect((S.square() as any).debug()).toEqual({
      type: '#union',
      children: [S.square()],
    });
  });

  it('should add background modifier to existing object', () => {
    expect((S.square() as any).background()).toEqual({
      type: '%union',
      children: [S.square()],
    });
  });
}); 