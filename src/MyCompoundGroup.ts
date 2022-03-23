import { defineComponent, ref, provide, inject, h } from 'vue'

const injectionKey = Symbol('example')

const Parent = defineComponent({
  props: {
    initialCount: {
      type: Number,
      default: 0,
    },
    initialMessage: {
      type: String,
      default: 'hello world',
    }
  },
  setup: (props, ctx) => {
    const count = ref(props.initialCount)
    const message = ref(props.initialMessage)

    provide(injectionKey, { count, message })

    return () => h('div', [
      h('h2', { class: 'text-sm font-bold uppercase tracking-widest text-gray-700' }, 'Parent'),
      h('pre', { class: 'p-4 rounded bg-gray-100 text-gray-700' }, [`count: ${count.value}\nmessage: ${message.value}`]),
      ctx.slots.default() 
    ])
  }
})

const Child = defineComponent({
  setup (props, ctx) {
    const { count, message } = inject(injectionKey)

    return () => h('div', [
      h('h2', { class: 'text-sm font-bold uppercase tracking-widest' }, 'Child'),
      h('div', { class: 'flex items-center gap-4' }, [
        h('button',
          {
            class: 'p-2 rounded border border-green-900 text-green-900',
            onClick: () => count.value++
          },
          'count++'
        ),
        h('button',
          {
            class: 'p-2 rounded border border-green-900 text-green-900',
            onClick: () => count.value--
          },
          'count--'
        ),
      ]),
      h('input',
        {
          type: 'text',
          class: 'p-2 rounded shadow-inner bg-green-200',
          onInput: ({ target: { value: newMsg } }) => message.value = newMsg,
          value: message.value,
        },
      ),
    ])
  }
})

export { Parent, Child }
