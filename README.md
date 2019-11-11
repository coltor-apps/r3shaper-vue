<p align="center">
  <img width="400px" src="./assets/r3shaper-vue-logo.png" alt="logo" />
</p>

<p align="center">
✨R3shaper Vue fetch component ✨
</p>

<p align="center">
  <img src="https://travis-ci.org/coltor-apps/r3shaper-vue.svg?branch=master">
  <img src="https://badge.fury.io/js/r3shaper-vue.svg">
  <img src="https://img.shields.io/badge/License-MIT-green.svg">
  <a href="https://twitter.com/home?status=https%3A//github.com/coltor-apps/r3shaper-vue">
    <img src="https://img.shields.io/twitter/url/https/github.com/coltor-apps/r3shaper-vue.svg?style=social">
  </a>
</p>

<p align="center">
  <img width="400px" src="./assets/basic-example.png" alt="example" />
</p>

> Note: Proper documentation coming soon.

### Props

| Prop     | Type          | Required | Default | Description                                                          |
|----------|---------------|----------|---------|----------------------------------------------------------------------|
| resource | Function      | true     |         | R3shaper resource.                                                   |
| manual   | Boolean       | false    | false   | Whether the request should be dispatched manually.                   |
| tag      | String / Null | false    | "div"   | Wrapper element tag. If null, only the first child will be rendered. |
| debounce | Number        | false    | 0       | Request debounce interval.                                           |
| throttle | Number        | false    | 0       | Request throttle interval.                                           |

### Default Slot - Scope

| Prop     | Type                                                     | Description                         |
|----------|----------------------------------------------------------|-------------------------------------|
| loading  | Boolean                                                  | True if the request is in progress. |
| dispatch | Function(options = {}, reducer = function(oldResult, newResult)) | Request trigger.                    |
| result   | Mixed                                                    | Request result.                     |
| error    | Mixed                                                    | Request error.                      |
