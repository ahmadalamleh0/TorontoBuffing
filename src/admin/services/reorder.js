/**
 * Swaps `sort_order` between an item and its neighbour, persists both
 * rows, and returns the re-sorted list — shared by every admin list
 * page that has up/down reorder buttons (Projects, Reviews, FAQs,
 * Services).
 *
 * @param {object[]} list current, already sort_order-sorted list
 * @param {number} index index of the item to move
 * @param {-1 | 1} direction -1 = up, 1 = down
 * @param {{ update(id: string, values: object): Promise<object> }} service
 */
export async function moveItem(list, index, direction, service) {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= list.length) return list;

  const a = list[index];
  const b = list[targetIndex];
  const aOrder = a.sort_order;
  const bOrder = b.sort_order;

  await Promise.all([service.update(a.id, { sort_order: bOrder }), service.update(b.id, { sort_order: aOrder })]);

  const next = [...list];
  next[index] = { ...a, sort_order: bOrder };
  next[targetIndex] = { ...b, sort_order: aOrder };
  next.sort((x, y) => x.sort_order - y.sort_order);
  return next;
}
