/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';

describe('Breadcrumb', () => {
  let Breadcrumb;
  let BreadcrumbItem;

  beforeEach(() => {
    jest.resetModules();
    const BreadcrumbEntrypoint = require('../');
    Breadcrumb = BreadcrumbEntrypoint.Breadcrumb;
    BreadcrumbItem = BreadcrumbEntrypoint.BreadcrumbItem;
  });

  it('should render', () => {
    const wrapper = mount(
      <Breadcrumb className="parent-class">
        <BreadcrumbItem
          className="some-class"
          href="www.carbondesignsystem.com">
          Breadcrumb 1
        </BreadcrumbItem>
      </Breadcrumb>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support rendering without a trailing slash', () => {
    const wrapper = mount(
      <Breadcrumb noTrailingSlash>
        <BreadcrumbItem href="www.carbondesignsystem.com">
          Breadcrumb 1
        </BreadcrumbItem>
      </Breadcrumb>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support rendering a custom component as a breadcrumb item', () => {
    const CustomComponent = jest.fn(({ children, href, ...rest }) => (
      <a href={href} data-test-id="custom-component" {...rest}>
        {children}
      </a>
    ));

    mount(
      <Breadcrumb>
        <BreadcrumbItem href="#a">A</BreadcrumbItem>
        <BreadcrumbItem href="#b">B</BreadcrumbItem>
        <BreadcrumbItem>
          <CustomComponent href="#c">C</CustomComponent>
        </BreadcrumbItem>
      </Breadcrumb>
    );

    expect(CustomComponent).toHaveBeenCalled();
    expect(CustomComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'bx--link',
      }),
      {}
    );
  });

  it('should support rendering the current page', () => {
    const manual = mount(
      <Breadcrumb>
        <BreadcrumbItem href="#a">A</BreadcrumbItem>
        <BreadcrumbItem href="#b">B</BreadcrumbItem>
        <BreadcrumbItem href="#c" isCurrentPage>
          C
        </BreadcrumbItem>
      </Breadcrumb>
    );
    expect(manual).toMatchSnapshot();

    const aria = mount(
      <Breadcrumb>
        <BreadcrumbItem href="#a">A</BreadcrumbItem>
        <BreadcrumbItem href="#b">B</BreadcrumbItem>
        <BreadcrumbItem href="#c" aria-current="page">
          C
        </BreadcrumbItem>
      </Breadcrumb>
    );
    expect(aria).toMatchSnapshot();
  });
});
