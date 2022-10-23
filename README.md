# Ardime

A simple rendering library

# Navigating The Project

**Run The Code**

* Install the npm modules with the following commands: (If not already done so)

  * ```
    cd test
    npm install
    ```

* Run the project

  * ```
    cd test
    npx webpack build
    node index
    ```

**Compress The Library**

```
cd test
npx webpack build
```

## To Do

* polish and implement rendering options
* create a performance class for debugging
* camera manipulation (when uniform object change, make draw call)
* shader abstraction (when shader is changed, make draw call)
* Use third party math library for linear algebra
* better error handling
* text rendering

* frame buffers
* uniform buffers



* canvas resizes



## Better Fixes

* Put a lot of the renderer code outside of the class