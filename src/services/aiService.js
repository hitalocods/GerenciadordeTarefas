export async function organizeTasks(tasks) {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const priorityOrder = {
    alta: 1,
    media: 2,
    baixa: 3
  };

  return [...tasks].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}